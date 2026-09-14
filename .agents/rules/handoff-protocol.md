# 인수인계 및 데이터 전달 프로토콜 (Handoff Protocol)

> 이 팀에는 어떤 스킬들이 있고, 전략 브리프가 나오면 누구에게 파일을 넘겨야 하는가? 를 정의하는 인수인계 규칙(데이터 전달 프로토콜) 요약본입니다. 환각을 줄이기 위해 에이전트들이 작업의 전체 흐름과 산출물 위치를 한눈에 파악하는 용도로 쓰입니다.

## 팀 보유 스킬 목록

- **[api-security-checklist](../skills/api-security-checklist/)**: 웹앱 API 보안 체크리스트. OWASP Top 10 기반 취약점 점검, 인증/인가 패턴, 입력 검증, Rate Limiting, CORS, CSRF, SQL Injection 방어를 제공하는 backend-dev 확장 스킬. 'API 보안', 'OWASP', '인증 구현', 'SQL Injection', 'XSS 방어', 'CORS 설정', '보안 체크리스트' 등 백엔드 보안 설계 시 사용한다. 단, 침투 테스트 수행이나 WAF 구성은 이 스킬의 범위가 아니다.

- **[component-patterns](../skills/component-patterns/)**: React/Next.js 컴포넌트 설계 패턴 라이브러리. Compound/Render Props/HOC/Custom Hooks 패턴, 상태관리 전략(Zustand/React Query/Context), 폴더 구조 컨벤션을 제공하는 frontend-dev 확장 스킬. '컴포넌트 패턴', 'React 패턴', '상태관리', '폴더 구조', 'Custom Hook', '컴포넌트 분리' 등 프론트엔드 아키텍처 설계 시 사용한다. 단, 실제 코드 구현이나 백엔드 로직은 이 스킬의 범위가 아니다.

## 아티팩트(산출물) 인수인계 규칙

| 전략 | 방식 | 용도 |
|------|------|------|
| 파일 기반 | `_workspace/` + `src/` | 설계 문서 + 소스 코드 |
| 메시지 기반 | 워크플로우 파이프라인 | API 연동 이슈, 코드 리뷰, 수정 요청 |
| 태스크 기반 | TaskCreate/TaskUpdate | 진행 상황 추적, 의존 관계 관리 |

