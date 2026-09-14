# Gemini Slide Studio 🚀

> 자연어 기획안 텍스트를 입력하면 **Gemini Flash Lite**가 `web-slide-creator` 표준 규격(16:9 반응형, Amber-Slate 테마, ApexCharts 데이터 시각화, Lucide 아이콘, 자동 순차 reveal, HUD 네비게이션, 인쇄 최적화)을 충족하는 단독 실행형 고성능 웹 프레젠테이션으로 즉시 변환해 주는 풀스택 웹 애플리케이션입니다.

---

## ✨ 핵심 기능

1. **Gemini Flash Lite 엔진 탑재**:
   - `gemini-2.5-flash-lite` 및 최신 Google 권장 `gemini-3.5-flash-lite` 호환 엔진 지원
   - 서버 사이드 API 라우트를 통한 `GEMINI_API_KEY` 보안 관리
2. **web-slide-creator v3.0~v4.7.5 표준 100% 준수**:
   - **16:9 황금 비율**: `1400px` x `787.5px` 표준 규격 및 1300px 중앙 칼정렬
   - **The Amber-Slate Design System**: 다크(Slate 900) & 라이트(Slate 50) 테마, 글래스모피즘
   - **Image-Free 원칙**: 외부 이미지 생성 대신 **Lucide 아이콘**과 CSS 그라데이션, SVG 패턴 활용
   - **ApexCharts 데이터 시각화**: 수치 및 성장 지표 슬라이드에 대화형 차트 렌더링
   - **인터랙션**: `[data-step]` 자동 순차 reveal, 첫 슬라이드 누락 버그 방지(`currentIndex = -1`), 하단 고정 HUD 네비게이션, 단축키 모달(`?`)
   - **PDF 인쇄 최적화**: `@media print` 및 JS 트랜스폼 동적 리셋을 통한 100% 온전한 슬라이드 덱 인쇄
3. **사용자 편의 기능**:
   - **원클릭 프리셋**: 2026 수소 산업 전망, 2026 AI 에이전트 트렌드, 스타트업 IR 피치덱, 클라우드 로드맵
   - **새 창 발표 모드**: 전체화면 프레젠테이션 독립 실행
   - **단일 HTML 다운로드**: 오프라인 브라우저에서 바로 열 수 있는 `.html` 단일 파일 내보내기
   - **실시간 코드 편집기**: 생성된 HTML 소스 코드를 확인하고 직접 수정하여 프리뷰에 즉시 반영
   - **보관함(히스토리)**: 브라우저 LocalStorage 기반 생성된 슬라이드 자동 보관 및 복원

---

## 🛠️ 기술 스택

- **Frontend & Backend**: Next.js 14 (App Router, TypeScript), React 18
- **Styling**: Modern Vanilla CSS, CSS Variables, Glassmorphism
- **AI Model**: Google Gemini (`gemini-2.5-flash-lite` / `gemini-3.5-flash-lite`)
- **Slide Engine**: Vanilla Slide System v3.0 (HTML5, ES6+, ApexCharts CDN, Lucide CDN)

---

## 🚀 빠른 시작 가이드 (Quick Start)

### 1. 저장소 클론 및 패키지 설치
```bash
git clone https://github.com/avata200ms/16-webapp-skill.git
cd 16-webapp-skill
npm install
```

### 2. 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 발급받은 Gemini API 키를 입력합니다:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3005
```

### 3. 실행
```bash
# 개발 서버 실행
npm run dev

# 또는 프로덕션 빌드 및 실행 (권장)
npm run build
npm run start
```
브라우저에서 **http://localhost:3005**로 접속합니다.

---

## 📄 라이선스
MIT License
