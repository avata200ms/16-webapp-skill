# 아키텍처 설계 문서 (Architecture Design Document)

## 프로젝트 개요
- **프로젝트명**: Gemini Slide Studio (발표용 웹 슬라이드 자동 생성 서비스)
- **설명**: 사용자가 텍스트로 입력한 슬라이드 기획안을 분석하여, `web-slide-creator` v3.0~v4.7.5 표준 규격(16:9 황금비율, Amber-Slate 다크/라이트 디자인 시스템, ApexCharts 데이터 시각화, Lucide 아이콘, 자동 순차 노출, HUD 네비게이션, 인쇄 최적화)을 충족하는 단독 실행형 HTML5 웹 프레젠테이션을 생성하고 브라우저에서 즉시 인터랙티브하게 발표/편집/다운로드/인쇄할 수 있는 웹 애플리케이션입니다.
- **타깃 사용자**: 기획자, 개발자, 강사, 발표자, 스타트업 창업가 등 빠른 시간에 웹 기반 고성능 프레젠테이션을 제작하고자 하는 모든 사용자.
- **프로젝트 규모**: MVP / 풀스택 웹앱

## 기능 요구사항
| # | 기능 | 설명 | 우선순위 |
|---|------|------|---------|
| FR-1 | 기획안 텍스트 입력 | 발표 주제, 목차, 전달 내용 등을 멀티라인 텍스트로 자유롭게 입력 | P0 |
| FR-2 | 생성 옵션 설정 | 목표 슬라이드 장수(3~10장), 발표 톤(전문적/기술/스타트업 피치), 차트 포함 여부 설정 | P0 |
| FR-3 | Gemini 2.5 Flash Lite 호출 | Google의 `gemini-2.5-flash-lite` 모델을 통해 시스템 규격에 맞는 웹 슬라이드 코드 생성 | P0 |
| FR-4 | web-slide-creator 규격 준수 | 16:9 반응형, Amber-Slate 팔레트, Lucide 아이콘, ApexCharts, `[data-step]`, HUD, 단축키 모달, 인쇄 최적화 | P0 |
| FR-5 | 실시간 Live 샌드박스 프리뷰 | 생성된 슬라이드를 iframe 샌드박스에서 격리하여 상위 앱 간섭 없이 즉시 조작 가능하게 렌더링 | P0 |
| FR-6 | 풀스크린 프레젠테이션 모드 | 새 탭 또는 전체화면 모드로 실제 발표 환경에서 슬라이드 진행 | P0 |
| FR-7 | 코드 편집기 및 원클릭 복사 | 생성된 단일 HTML 코드를 확인하고 직접 수정한 뒤 실시간 반영, 클립보드 복사 | P1 |
| FR-8 | 단일 HTML 파일 다운로드 | 외부 의존성 없이 오프라인 브라우저에서 바로 열 수 있는 `.html` 파일 저장 | P1 |
| FR-9 | PDF 인쇄 트리거 | 브라우저 인쇄 다이얼로그 호출 및 @media print 최적화 가이드 제공 | P1 |
| FR-10| 생성 히스토리 저장 | 최근 생성한 슬라이드 덱을 LocalStorage에 자동 저장하고 원클릭 복원 | P2 |
| FR-11| 퀵 샘플 프리셋 | AI 트렌드 보고서, 스타트업 IR 피치덱, 분기 사업계획서 등 즉시 테스트 가능한 예제 제공 | P1 |

## 비기능 요구사항
| # | 항목 | 요구사항 |
|---|------|---------|
| NFR-1 | 보안성 | API Key(`.env`)는 절대 브라우저 클라이언트에 노출되지 않고 Next.js 서버 라우트 내부에서만 소비 |
| NFR-2 | 성능 & 반응속도 | `gemini-2.5-flash-lite` 모델의 초고속 추론 성능을 활용하여 10~20초 내에 4~8페이지 슬라이드 덱 완성 |
| NFR-3 | 디스플레이 적응성 | 16:9 비율 유지 및 scale-to-fit 엔진을 통해 모바일, 태블릿, 노트북, 4K 대형 모니터까지 완벽 대응 |
| NFR-4 | 인쇄 품질 | 브라우저의 배경 그래픽 인쇄 시 요소 누락 없이 모든 슬라이드가 수직 페이지 단위로 깔끔하게 출력 |
| NFR-5 | 스타일 격리 | 생성된 슬라이드가 메인 웹앱의 스타일에 영향을 주거나 받지 않도록 `iframe` 샌드박스 적용 |

## 기술 스택
| 구분 | 기술 | 선택 근거 |
|------|------|----------|
| 프론트엔드 | Next.js 14/15 (React 18/19, TypeScript) | SSR/CSR 하이브리드, App Router를 통한 직관적인 라우팅 및 빠른 번들링 |
| 스타일링 | Vanilla CSS + Modern CSS Variables | web-slide-creator와 일관된 글래스모피즘 및 다크/라이트 테마 제어 |
| 백엔드 | Next.js App Router Route Handler (`/api/generate-slide`) | 별도 백엔드 서버 없이 단일 프로세스에서 API Key 보안 보호 및 Gemini API 프록시 처리 |
| LLM 엔진 | Google `gemini-2.5-flash-lite` | 초고속 응답 속도, 방대한 컨텍스트 처리, 복잡한 웹 코드 생성에 최적화 |
| 슬라이드 엔진 | Vanilla Slide System v3.0 (HTML5, ES6+, ApexCharts, Lucide CDN) | `web-slide-creator`의 무결점 단독 실행형 프레젠테이션 아키텍처 |
| 상태 저장 | Browser LocalStorage | MVP 환경에서 사용자별 프레젠테이션 저장 및 복원 (무설정, 즉시 동작) |

## 시스템 아키텍처
```mermaid
flowchart TB
    subgraph Client["브라우저 클라이언트"]
        UI["대시보드 UI (Next.js CSR)"]
        Form["기획안 입력 & 프리셋 선택기"]
        Viewer["16:9 반응형 Live Preview (iframe)"]
        Editor["코드 뷰어 / 에디터"]
        History["LocalStorage 히스토리 매니저"]
    end

    subgraph Server["Next.js 백엔드 (Server Side)"]
        API["/api/generate-slide"]
        PromptBuilder["web-slide-creator 프롬프트 빌더"]
        GeminiClient["Google Generative AI Client"]
        Env[".env (GEMINI_API_KEY)"]
    end

    subgraph GoogleAI["Google Cloud / Gemini API"]
        Model["gemini-2.5-flash-lite"]
    end

    Form -->|1. 기획안 + 설정 전송| API
    Env -.->|API Key 주입| GeminiClient
    API -->|2. 엄격한 슬라이드 규격 프롬프트 합성| PromptBuilder
    PromptBuilder -->|3. 요청| GeminiClient
    GeminiClient -->|4. GenerateContent| Model
    Model -->|5. 생성된 HTML5 프레젠테이션 코드| GeminiClient
    GeminiClient -->|6. 코드 추출 및 검증| API
    API -->|7. JSON 응답 (html, title, slideCount)| UI
    UI -->|8. 샌드박스 srcdoc 렌더링| Viewer
    UI -->|9. 소스 동기화| Editor
    UI -->|10. 덱 저장| History
```

## 디렉토리 구조
```
16-webapp-skill/
├── .env                  # 사용자 GEMINI_API_KEY 저장 (비공개)
├── .env.example          # 환경변수 템플릿
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.mjs
├── _workspace/           # 워크플로우 산출물
│   ├── 00_input.md
│   ├── 01_architecture.md
│   ├── 02_api_spec.md
│   ├── 03_db_schema.md
│   ├── 04_test_plan.md
│   ├── 05_deploy_guide.md
│   └── 06_review_report.md
├── src/
│   ├── app/
│   │   ├── layout.tsx            # 루트 레이아웃 (폰트, 메타데이터)
│   │   ├── page.tsx              # 메인 대시보드 페이지
│   │   ├── globals.css           # 모던 디자인 시스템 & 글래스모피즘
│   │   ├── api/
│   │   │   └── generate-slide/
│   │   │       └── route.ts      # Gemini 2.5 Flash Lite 호출 엔드포인트
│   │   └── preview/
│   │       └── page.tsx          # 전체화면 프레젠테이션 독립 라우트
│   ├── components/
│   │   ├── Header.tsx            # 탑바 (로고, 템플릿 로더, 상태 인디케이터)
│   │   ├── PromptInputPanel.tsx  # 기획안 입력 폼 & 슬라이더 & 프리셋
│   │   ├── SlideViewer.tsx       # 16:9 반응형 iframe 샌드박스 뷰어 & 액션 툴바
│   │   ├── CodeEditorModal.tsx   # HTML 코드 편집 및 클립보드 복사 모달
│   │   ├── HistoryDrawer.tsx     # 생성 히스토리 사이드바
│   │   └── Toast.tsx             # 알림 피드백 토스트
│   └── lib/
│       ├── gemini.ts             # Gemini 2.5 Flash Lite API 호출 모듈
│       ├── slide-prompt.ts       # web-slide-creator 스킬을 100% 이식한 시스템 프롬프트
│       ├── sample-deck.ts        # API Key 미동작 시에도 즉시 체험 가능한 기본 슬라이드
│       └── storage.ts            # LocalStorage 헬퍼
```

## 프론트엔드 전달 사항
- `src/components/PromptInputPanel.tsx`: 텍스트 에어리어는 사용자가 편리하게 복사/붙여넣기할 수 있도록 넉넉한 높이 제공, 장수 선택(3~10장), 차트 포함 스위치 제공.
- `src/components/SlideViewer.tsx`: `iframe`의 `srcdoc` 속성을 통해 생성된 HTML을 온전히 로드. 툴바에 [전체화면 발표], [HTML 다운로드], [코드 보기], [PDF 인쇄] 버튼 배치.
- 인쇄 동작: iframe 내부의 `window.print()`를 트리거하여 `web-slide-creator`의 `@media print` 스타일이 완벽히 작동하도록 구성.

## 백엔드 전달 사항
- `src/app/api/generate-slide/route.ts`: 반드시 모델명을 `gemini-2.5-flash-lite`로 지정.
- `GEMINI_API_KEY`가 없을 경우 명확한 400 에러 반환 및 클라이언트에 안내.
- `web-slide-creator` 가이드라인(Amber-Slate 색상표, 16:9, Outfit/Inter 폰트, ApexCharts 옵션, `[data-step]`, HUD, `currentIndex = -1`, `@media print` 등)을 철저히 프롬프트 지침에 포함하여 환각 없이 단일 실행 가능한 HTML 문서(`<!DOCTYPE html>...</html>`)만 마크다운 코드블록 안에 출력하도록 강제.

## QA 전달 사항
- 기획안 입력 후 정상 생성 여부 확인.
- 생성된 슬라이드 내부의 방향키(Left/Right), HUD 버튼, 테마 토글, 단축키 모달(`?`) 작동 확인.
- ApexCharts 차트가 포함된 슬라이드가 오류 없이 렌더링되는지 확인.
- 브라우저 인쇄 미리보기에서 슬라이드들이 잘리지 않고 온전히 출력되는지 확인.

## DevOps 전달 사항
- 로컬 개발 서버 실행 스크립트: `npm run dev`
- 프로덕션 빌드 스크립트: `npm run build && npm run start`
- 환경 변수 `.env` 가이드 작성.
