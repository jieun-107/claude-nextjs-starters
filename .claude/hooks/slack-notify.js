// Claude Code 훅(stdin JSON)을 받아 Slack 웹훅으로 알림을 전송합니다.
// 처리 이벤트: PermissionRequest(권한 요청), Stop(작업 완료)
// 알림 실패가 Claude Code 동작을 막지 않도록 항상 exit 0으로 종료합니다.
// 웹훅 URL은 프로젝트 루트의 .env 파일에서 SLACK_WEBHOOK_URL을 읽어 사용합니다.

const path = require('node:path');

const TIMEOUT_MS = 5000;
const SLACK_PREFIX = 'https://hooks.slack.com/';

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

// 알림 발생 시점의 시각을 한국 시간 기준 "YYYY-MM-DD HH:mm:ss" 형식으로 반환합니다.
function formatNow() {
  return new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' });
}

// 텍스트의 첫 번째 비어있지 않은 줄을 공백 정리 후 max자로 잘라 반환합니다.
// 값이 없거나 문자열이 아니면 빈 문자열을 반환합니다.
function summarize(text, max = 100) {
  if (typeof text !== 'string') {
    return '';
  }
  const firstLine = text
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.length > 0);
  if (!firstLine) {
    return '';
  }
  const oneLine = firstLine.replace(/\s+/g, ' ');
  return oneLine.length > max ? `${oneLine.slice(0, max)}…` : oneLine;
}

// 권한 요청 상태 문구를 만듭니다. 예: "권한 요청 - Bash: npm run build"
function describePermission(input) {
  const toolInput = input.tool_input ?? {};
  const target = summarize(toolInput.command) || summarize(toolInput.file_path);
  const tool = input.tool_name ?? '도구';
  return target ? `권한 요청 - ${tool}: ${target}` : `권한 요청 - ${tool}`;
}

// 훅 이벤트 종류에 따라 Slack 메시지 본문을 만듭니다.
// 출력 항목: 프로젝트명, 상태(구체적 내용 포함), 작업시간(알림 발생 시점)
function buildMessage(input) {
  const project = path.basename(input.cwd || process.cwd());
  const time = formatNow();

  switch (input.hook_event_name) {
    case 'PermissionRequest':
      return [
        `🔐 *프로젝트명*: ${project}`,
        `*상태*: ${describePermission(input)}`,
        `*작업시간*: ${time}`,
      ].join('\n');
    case 'Stop': {
      const summary = summarize(input.last_assistant_message);
      return [
        `✅ *프로젝트명*: ${project}`,
        `*상태*: ${summary ? `작업 완료 - ${summary}` : '작업 완료'}`,
        `*작업시간*: ${time}`,
      ].join('\n');
    }
    default:
      return null;
  }
}

async function main() {
  // 프로젝트 루트의 .env를 환경변수로 불러옵니다. 이미 설정된 값은 덮어쓰지 않습니다.
  // 훅의 cwd와 무관하도록 스크립트 위치 기준으로 경로를 잡습니다.
  try {
    process.loadEnvFile(path.resolve(__dirname, '../../.env'));
  } catch {
    // .env가 없으면 무시합니다. 아래 URL 검증에서 조용히 종료됩니다.
  }

  // 웹훅 URL이 없거나 Slack 주소가 아니면(예: 자리표시자) 아무것도 하지 않습니다.
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url || !url.startsWith(SLACK_PREFIX)) {
    return;
  }

  let input;
  try {
    input = JSON.parse(await readStdin());
  } catch {
    return;
  }

  const text = buildMessage(input);
  if (!text) {
    return;
  }

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    // 네트워크 오류는 무시합니다. 훅 실패가 세션을 막지 않도록 합니다.
  }
}

main().finally(() => process.exit(0));
