# API 명세서 (API Specification)

## 기본 정보
- **Base URL**: `/api`
- **인증 방식**: 서버 사이드 환경변수 (`GEMINI_API_KEY`) 내부 사용 (클라이언트 인증 불필요)
- **응답 형식**: JSON (`application/json`)

## 엔드포인트 목록
| Method | Path | 설명 | 인증 | 요청 Body | 응답 |
|--------|------|------|------|----------|------|
| POST | `/api/generate-slide` | 슬라이드 기획안 텍스트를 입력받아 Gemini 2.5 Flash Lite로 웹 슬라이드 HTML 생성 | 서버 내부 .env | `{ prompt, slideCount, topic, includeChart, audience }` | `{ success, title, html, slideCount }` |
| GET | `/api/health` | 시스템 헬스체크 및 Gemini API Key 구성 상태 확인 | 없음 | 없음 | `{ status, apiKeyConfigured, model }` |

---

## 상세 API 명세

### 1. [POST] `/api/generate-slide`

슬라이드 기획 텍스트와 제어 옵션을 받아 `web-slide-creator` v3.0 표준을 완벽히 준수하는 완전한 단일 HTML 문서를 생성합니다.

#### 요청 본문 (Request Body)
```json
{
  "prompt": "2026년 인공지능 에이전트 트렌드와 기업의 생산성 혁신 전략에 대한 발표 자료를 만들어줘. 도입 배경, 기술 변화, 생산성 차트 비교, 향후 액션 플랜을 포함해줘.",
  "slideCount": 5,
  "topic": "AI Agent Trends 2026",
  "includeChart": true,
  "theme": "dark",
  "audience": "기업 임원 및 엔지니어"
}
```

| 필드 | 타입 | 필수 여부 | 기본값 | 설명 |
|------|------|-----------|--------|------|
| `prompt` | string | **필수** | - | 슬라이드 제작을 위한 기획안 텍스트, 목차, 전달 내용 |
| `slideCount` | number | 선택 | 5 | 생성할 슬라이드 개수 (범위: 3 ~ 10) |
| `topic` | string | 선택 | "" | 프레젠테이션 대표 주제/제목 |
| `includeChart` | boolean | 선택 | true | ApexCharts 기반 데이터 시각화 슬라이드 포함 여부 |
| `theme` | string | 선택 | "dark" | 기본 시작 테마 ("dark" 또는 "light") |
| `audience` | string | 선택 | "일반" | 청중 대상 (어조 및 전문성 조절) |

#### 성공 응답 (200 OK)
```json
{
  "success": true,
  "data": {
    "title": "2026 AI Agent 트렌드 및 생산성 혁신",
    "slideCount": 5,
    "html": "<!DOCTYPE html>\n<html lang=\"ko\" data-theme=\"dark\">\n<head>...\n</html>",
    "model": "gemini-2.5-flash-lite",
    "createdAt": "2026-09-14T11:25:00.000Z"
  }
}
```

#### 에러 응답 (Error Responses)
- **400 Bad Request**
  ```json
  {
    "success": false,
    "error": {
      "code": "INVALID_INPUT",
      "message": "슬라이드 기획안(prompt)을 10자 이상 입력해 주세요."
    }
  }
  ```
- **500 Internal Server Error (API Key 누락 또는 Gemini 호출 실패)**
  ```json
  {
    "success": false,
    "error": {
      "code": "GEMINI_API_ERROR",
      "message": "Gemini API 호출에 실패했습니다. API 키 유효성을 확인해 주세요."
    }
  }
  ```

---

### 2. [GET] `/api/health`

서버 동작 상태 및 `GEMINI_API_KEY` 환경변수 설정 여부를 점검합니다. (보안을 위해 실제 키 값은 노출하지 않고 boolean 및 마스킹된 앞뒤 3자리만 노출)

#### 성공 응답 (200 OK)
```json
{
  "status": "ok",
  "model": "gemini-2.5-flash-lite",
  "apiKeyConfigured": true,
  "apiKeyMasked": "AQ.***iiw"
}
```

---

## Gemini 2.5 Flash Lite 시스템 프롬프트 엔지니어링 규격

`src/lib/slide-prompt.ts`에서 시스템 프롬프트로 주입되는 핵심 요구조건:
1. **정확한 모델**: `gemini-2.5-flash-lite` 엔드포인트 호출.
2. **단일 파일 완성**: 외부 CSS/JS 파일 참조 없이 `<head>` 내부에 CDN(Google Fonts, Lucide Icons, ApexCharts)과 `<style>`, `<body>` 내부에 마크업과 `<script>`를 모두 포함하는 완전한 HTML5 파일 1개만 생성.
3. **HTML 출력 형식**: 불필요한 설명문 없이 오직 ````html <!DOCTYPE html> ... </html> ```` 형식으로 출력.
4. **web-slide-creator 스킬 핵심 규칙 강제 주입**:
   - `Presentation` 클래스 구조 (constructor에서 `this.currentIndex = -1` 필수)
   - 16:9 규격 (`1400px` x `787.5px`), `slide-header` 및 `.content` 1300px 중앙 칼정렬
   - Amber-Slate 색상 시스템 (`#0f172a`, `#1e293b`, `#f59e0b`, 글래스모피즘)
   - 외부 이미지 금지(Image-free), Lucide 아이콘 적극 활용 (`<i data-lucide="..."></i>` + `lucide.createIcons()`)
   - `[data-step]` 자동 순차 노출 시스템
   - ApexCharts 차트 컨테이너 (`max-width: 1100px`, `width: '100%'`)
   - 하단 고정 HUD (`#hud-overlay`) 및 도움말 모달 (`#help-modal`, `?` 키)
   - PDF 인쇄 최적화 (`@media print`, `beforeprint`와 `afterprint` 트랜스폼 핸들링)
