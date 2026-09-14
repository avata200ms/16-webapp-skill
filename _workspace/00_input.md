# 00. 사용자 요구사항 정의서 (User Requirements)

## 1. 프로젝트 개요
- **프로젝트 명칭**: Gemini 기반 발표용 웹 슬라이드 자동 생성 서비스 (Gemini Slide Studio)
- **핵심 목표**: 사용자가 슬라이드 기획안/아이디어를 자유로운 텍스트로 입력하면, Google Gemini 모델이 `web-slide-creator` 표준 규격(HTML5, Vanilla JS, CSS3, ApexCharts, Lucide 아이콘 등)에 맞춘 고성능 16:9 반응형 웹 프레젠테이션 코드를 생성하고, 이를 브라우저에서 즉시 인터랙티브하게 발표/편집/다운로드/PDF 출력할 수 있는 풀스택 웹 애플리케이션 구축.

## 2. 필수 제약 및 기술 요구사항
1. **Gemini 모델 강제**:
   - `gemini-2.5-flash-lite` 모델 필수 사용.
2. **`web-slide-creator` 스킬 전면 반영**:
   - **표준 레이아웃 & 비율**: 16:9 황금비율 고정 (`1400px` x `787.5px`), `slide-header` 및 `.content` 1300px 중앙 칼정렬.
   - **반응형 스케일링**: 브라우저 화면 크기에 맞춰 `transform: scale()` 기반 `scale-to-fit` 및 0.92 안전계수 적용.
   - **디자인 시스템**: Amber-Slate 팔레트 (Dark mode: Slate 900 `#0f172a`, Accent Amber `#f59e0b`, Glassmorphism; Light mode: Slate 50 `#f8fafc`, Accent `#d97706`).
   - **타이포그래피**: Google Fonts `Outfit` (헤더/강조), `Inter` (UI/본문).
   - **이미지 배제(Image-free)**: 외부 이미지 생성 없이 Lucide 아이콘, CSS 그라데이션, SVG 패턴만 사용.
   - **데이터 시각화**: 통계 및 차트 데이터는 `ApexCharts`로 인터랙티브 렌더링.
   - **순차적 노출**: `[data-step]` 속성 기반 자동 스텝 노출 (전환 시 0.2~0.3s 간격).
   - **네비게이션 & HUD**: 하단 고정형 HUD(로고, 2자리 페이지 번호 `01 / 10`, 진행 바, 테마 토글, 컨트롤 버튼 모음), 도움말 단축키 모달(`?`, `/`, `ESC`).
   - **인쇄 및 PDF 최적화**: `@media print` 스타일 및 JS 동적 트랜스폼 해제(`beforeprint`, `afterprint`)로 100% 온전한 슬라이드 덱 인쇄/PDF 보장.
   - **초기 슬라이드 버그 방지**: `this.currentIndex = -1` 초기화로 첫 슬라이드 스텝 노출 보장.
3. **환경 변수 & 보안**:
   - `.env` 방식을 통한 `GEMINI_API_KEY` 관리 (클라이언트 노출 절대 금지, 서버 사이드 API Route 처리).
4. **웹 서비스 사용자 기능**:
   - 슬라이드 기획 텍스트 입력창 (멀티라인 텍스트 및 기본 프리셋/템플릿 선택 기능).
   - 옵션 설정 (목표 슬라이드 장수, 발표 목적, 청중 대상, 차트 시각화 선호도 등).
   - 실시간 생성 상태 표시 (로딩/프로그레스 UI).
   - 슬라이드 덱 듀얼 뷰:
     - **Live Presentation View**: 실제 iframe 샌드박스에서 즉시 키보드/HUD로 프레젠테이션 조작 가능.
     - **Full Screen / New Tab Presentation**: 전체화면 독립 실행 모드 지원.
     - **Code Editor & Export**: 생성된 HTML 코드 확인/직접 편집, 클립보드 복사, `.html` 단일 파일 다운로드, PDF 출력 원클릭 버튼.
   - 생성 히스토리/보관함: 브라우저 LocalStorage 기반 생성된 슬라이드 목록 저장 및 재로드.

## 3. 워크플로우 실행 모드
- **모드**: 풀 파이프라인 (Full Pipeline)
- **에이전트**: architect -> frontend-dev, backend-dev, devops-engineer -> qa-engineer
