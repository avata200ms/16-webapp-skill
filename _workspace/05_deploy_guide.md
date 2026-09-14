# 배포 및 운영 가이드 (Deployment Guide)

## 1. 개요
Gemini Slide Studio는 Next.js (App Router) 기반의 풀스택 웹 애플리케이션으로, Vercel, Node.js 서버, Docker 컨테이너 등 다양한 환경에 손쉽게 배포할 수 있습니다.

---

## 2. 환경 변수 요구사항

서버 실행을 위해 다음 환경 변수가 설정되어야 합니다:

| 변수명 | 필수 여부 | 기본값 | 설명 |
|--------|-----------|--------|------|
| `GEMINI_API_KEY` | **필수** | - | Google AI Studio에서 발급받은 API Key (`gemini-2.5-flash-lite` 호출용) |
| `PORT` | 선택 | `3000` | 서버 수신 포트 |
| `NODE_ENV` | 선택 | `development` / `production` | 실행 환경 모드 |

> [!CAUTION]
> `GEMINI_API_KEY`는 서버 측 API Route Handler 내부에서만 사용되며 클라이언트 번들에 노출되지 않습니다. 절대 `NEXT_PUBLIC_` 접두사를 붙이지 마십시오.

---

## 3. 로컬 환경 실행 가이드

### 3.1 사전 요구사항
- Node.js v18.17.0 이상 (권장: Node.js v20+)
- npm 또는 pnpm

### 3.2 의존성 설치 및 실행
```bash
# 1. 의존성 설치
npm install

# 2. .env 파일 생성 및 API Key 설정
# .env 파일에 GEMINI_API_KEY=your_key_here 작성

# 3. 개발 서버 실행
npm run dev
```
브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속합니다.

---

## 4. 프로덕션 빌드 및 독립 실행

```bash
# 1. 프로덕션 번들 빌드
npm run build

# 2. 프로덕션 서버 실행
npm run start
```

---

## 5. Vercel 배포 가이드 (권장)

Next.js 공식 플랫폼인 Vercel에 가장 최적화되어 있습니다:
1. GitHub 저장소에 코드를 푸시합니다.
2. Vercel 대시보드에서 `Import Project`를 실행합니다.
3. 프로젝트 설정의 **Environment Variables** 항목에 `GEMINI_API_KEY`를 등록합니다.
4. **Deploy** 버튼을 클릭하면 수초 내에 글로벌 CDN 엣지 네트워크로 자동 배포됩니다.

---

## 6. Docker 컨테이너 배포 가이드

단일 컨테이너로 배포하기 위한 `Dockerfile` 예시:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "run", "start"]
```

실행:
```bash
docker build -t gemini-slide-studio .
docker run -p 3000:3000 -e GEMINI_API_KEY=your_key gemini-slide-studio
```

---

## 7. 헬스체크 및 모니터링
- 헬스체크 엔드포인트: `GET /api/health`
- 응답:
  ```json
  {
    "status": "ok",
    "model": "gemini-2.5-flash-lite",
    "apiKeyConfigured": true,
    "apiKeyMasked": "AQ.***iiw"
  }
  ```
