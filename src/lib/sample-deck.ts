/**
 * web-slide-creator v3.0 ~ v4.7.5 표준 규격을 100% 준수한 완벽한 샘플 슬라이드 덱
 * 주제: 2026 AI 에이전트 트렌드 & 차세대 생산성 혁신
 */

export const SAMPLE_PRESENTATION_TITLE = '2026 AI 에이전트 트렌드 & 생산성 혁신';

export const SAMPLE_SLIDE_HTML = `<!DOCTYPE html>
<html lang="ko" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>2026 AI 에이전트 트렌드 & 생산성 혁신</title>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800;900&display=swap" rel="stylesheet">
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <!-- ApexCharts -->
  <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
  <style>
    :root {
      --bg-base: #0f172a;
      --bg-secondary: #1e293b;
      --text-main: #f8fafc;
      --text-dim: #94a3b8;
      --accent: #f59e0b;
      --accent-glow: rgba(245, 158, 11, 0.25);
      --glass-bg: rgba(30, 41, 59, 0.7);
      --glass-border: rgba(255, 255, 255, 0.1);
      --card-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
      --font-ui: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-display: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    [data-theme="light"] {
      --bg-base: #f8fafc;
      --bg-secondary: #f1f5f9;
      --text-main: #0f172a;
      --text-dim: #64748b;
      --accent: #d97706;
      --accent-glow: rgba(217, 119, 6, 0.2);
      --glass-bg: rgba(255, 255, 255, 0.85);
      --glass-border: rgba(0, 0, 0, 0.08);
      --card-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.08);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: var(--bg-base);
      color: var(--text-main);
      font-family: var(--font-ui);
      transition: background-color 0.3s ease, color 0.3s ease;
      user-select: none;
    }

    /* 16:9 Presentation Stage */
    .presentation-wrapper {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      background: radial-gradient(circle at 50% 20%, var(--bg-secondary) 0%, var(--bg-base) 100%);
    }

    .presentation {
      width: 1400px;
      height: 787.5px;
      aspect-ratio: 16 / 9;
      position: relative;
      transform-origin: center center;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 1400px;
      height: 787.5px;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px 60px 80px 60px;
      transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      transform: scale(0.98) translateY(10px);
    }

    .slide.active {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transform: scale(1) translateY(0);
    }

    /* Calibrated 1300px alignment */
    .slide-header, .content {
      width: 100%;
      max-width: 1300px;
      margin: 0 auto;
    }

    .slide-header {
      margin-top: 2vh;
      margin-bottom: 24px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--accent);
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.25);
      border-radius: 9999px;
      width: fit-content;
    }

    .slide-title {
      font-family: var(--font-display);
      font-size: 2.8rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 1.2;
      color: var(--text-main);
    }

    .slide-subtitle {
      font-size: 1.15rem;
      color: var(--text-dim);
      font-weight: 400;
    }

    .highlight-amber {
      color: var(--accent);
      background: linear-gradient(135deg, var(--accent) 0%, #fbbf24 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* Content Layouts */
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 28px;
      width: 100%;
    }

    .grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      width: 100%;
    }

    .grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      width: 100%;
    }

    /* Glass Cards */
    .glass-card {
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: 18px;
      padding: 28px;
      box-shadow: var(--card-shadow);
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;
      transition: transform 0.3s ease, border-color 0.3s ease;
    }

    .glass-card:hover {
      transform: translateY(-4px);
      border-color: rgba(245, 158, 11, 0.4);
    }

    .card-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(245, 158, 11, 0.12);
      color: var(--accent);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 18px;
    }

    .card-title {
      font-family: var(--font-display);
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 10px;
      color: var(--text-main);
    }

    .card-desc {
      font-size: 1rem;
      line-height: 1.6;
      color: var(--text-dim);
      flex: 1;
    }

    .metric-value {
      font-family: var(--font-display);
      font-size: 3.2rem;
      font-weight: 900;
      color: var(--accent);
      line-height: 1;
      margin-bottom: 6px;
    }

    /* Sequential Reveal data-step */
    [data-step] {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    [data-step].visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Slide 1: Hero */
    .hero-container {
      text-align: center;
      max-width: 1050px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .hero-title {
      font-family: var(--font-display);
      font-size: 4.8rem;
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -0.03em;
    }

    .hero-subtitle {
      font-size: 1.6rem;
      color: var(--text-dim);
      max-width: 800px;
      line-height: 1.6;
    }

    .hero-meta {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-top: 15px;
      padding: 10px 24px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: 9999px;
      font-size: 0.95rem;
      color: var(--text-dim);
    }

    /* Slide 3: Chart Container */
    .chart-container {
      width: 100%;
      max-width: 1100px;
      height: 380px;
      margin: 0 auto;
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: 18px;
      padding: 20px;
      box-shadow: var(--card-shadow);
    }

    /* Fixed Bottom HUD */
    #hud-overlay {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      max-width: 1200px;
      height: 60px;
      background: var(--glass-bg);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--glass-border);
      border-radius: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
      z-index: 100;
      transition: opacity 0.3s ease;
    }

    .hud-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .hud-logo {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.9rem;
      letter-spacing: 0.1em;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .hud-indicator {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--accent);
      padding: 4px 10px;
      background: rgba(245, 158, 11, 0.12);
      border-radius: 8px;
    }

    .hud-center {
      flex: 1;
      max-width: 380px;
      margin: 0 24px;
    }

    .progress-track {
      width: 100%;
      height: 6px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 9999px;
      overflow: hidden;
    }

    #progress-fill {
      height: 100%;
      width: 20%;
      background: linear-gradient(90deg, var(--accent) 0%, #fbbf24 100%);
      border-radius: 9999px;
      transition: width 0.4s ease;
    }

    .hud-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .hud-btn {
      background: transparent;
      border: none;
      color: var(--text-dim);
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .hud-btn:hover {
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.08);
      transform: scale(1.08);
    }

    /* Oval Theme Toggle */
    .oval-toggle {
      width: 52px;
      height: 28px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid var(--glass-border);
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 2px;
      transition: background 0.3s ease;
    }

    .oval-knob {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: var(--accent);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0f172a;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    [data-theme="light"] .oval-knob {
      transform: translateX(24px);
    }

    /* Help Modal */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 200;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    .modal-card {
      background: var(--bg-secondary);
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      padding: 32px;
      width: 90%;
      max-width: 540px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .modal-title {
      font-family: var(--font-display);
      font-size: 1.4rem;
      font-weight: 700;
    }

    .modal-close {
      background: none;
      border: none;
      color: var(--text-dim);
      cursor: pointer;
      font-size: 1.2rem;
    }

    .shortcuts-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      margin-bottom: 24px;
    }

    .shortcut-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      background: var(--bg-base);
      border-radius: 10px;
      font-size: 0.9rem;
    }

    kbd {
      background: var(--bg-secondary);
      border: 1px solid var(--glass-border);
      padding: 3px 8px;
      border-radius: 6px;
      font-family: monospace;
      font-weight: 600;
      color: var(--accent);
    }

    /* Print Optimization @media print */
    @media print {
      @page {
        size: landscape;
        margin: 0;
      }
      body {
        background: #0f172a !important;
        color: #f8fafc !important;
        -webkit-print-color-adjust: exact !important;
      }
      .presentation-wrapper {
        display: block !important;
        height: auto !important;
        background: #0f172a !important;
        padding: 0 !important;
      }
      #presentation {
        transform: none !important;
        width: 100% !important;
        height: auto !important;
        position: static !important;
      }
      .slide {
        display: flex !important;
        position: relative !important;
        page-break-after: always !important;
        break-after: page !important;
        width: 100vw !important;
        height: 100vh !important;
        opacity: 1 !important;
        visibility: visible !important;
        transform: none !important;
        padding: 40px !important;
      }
      [data-step] {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
      #hud-overlay, .modal-overlay {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="presentation-wrapper">
    <div class="presentation" id="presentation">

      <!-- Slide 1: Hero -->
      <section class="slide active" id="slide-1">
        <div class="hero-container">
          <div class="badge" data-step="1">
            <i data-lucide="sparkles" style="width: 14px; height: 14px;"></i>
            2026 Tech Outlook
          </div>
          <h1 class="hero-title" data-step="2">
            AI 에이전트 트렌드 &<br>
            <span class="highlight-amber">차세대 생산성 혁신</span>
          </h1>
          <p class="hero-subtitle" data-step="3">
            단순 질의응답을 넘어 자율 협업 파이프라인으로 진화하는 2026년 기업형 AI 에이전트 생태계와 전략적 로드맵
          </p>
          <div class="hero-meta" data-step="4">
            <span><i data-lucide="user" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i> Strategic AI Lab</span>
            <span>•</span>
            <span><i data-lucide="calendar" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i> 2026.09</span>
            <span>•</span>
            <span class="highlight-amber"><i data-lucide="shield-check" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i> Executive Brief</span>
          </div>
        </div>
      </section>

      <!-- Slide 2: Context & Challenge -->
      <section class="slide" id="slide-2">
        <div class="slide-header">
          <div class="badge">
            <i data-lucide="cpu" style="width: 14px; height: 14px;"></i>
            Market Transformation
          </div>
          <h2 class="slide-title">패러다임의 대전환: Chatbot에서 <span class="highlight-amber">Agentic Team</span>으로</h2>
          <p class="slide-subtitle">기존 단발성 프롬프트 인터페이스의 한계를 극복하고 목표 지향형 자율 협업으로 이동</p>
        </div>
        <div class="content">
          <div class="grid-3">
            <div class="glass-card" data-step="1">
              <div class="card-icon"><i data-lucide="message-square-off"></i></div>
              <h3 class="card-title">1세대: 단순 챗봇</h3>
              <p class="card-desc">사용자의 질문에 즉시 답하지만 장기 문맥 유지 불가 및 수동적 상호작용에 머무름.</p>
            </div>
            <div class="glass-card" data-step="2">
              <div class="card-icon"><i data-lucide="git-merge"></i></div>
              <h3 class="card-title">2세대: RAG & 도구 연동</h3>
              <p class="card-desc">외부 지식 검색과 사전 정의된 API 도구를 호출하여 업무 자동화 일부 지원.</p>
            </div>
            <div class="glass-card" data-step="3" style="border-color: rgba(245, 158, 11, 0.5);">
              <div class="card-icon"><i data-lucide="bot"></i></div>
              <h3 class="card-title highlight-amber">3세대: 자율 에이전트 팀</h3>
              <p class="card-desc">설계, 코딩, QA, 배포 등 다중 에이전트가 자체 피드백 루프로 결과물을 완성.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Slide 3: Data Visualization (ApexCharts) -->
      <section class="slide" id="slide-3">
        <div class="slide-header">
          <div class="badge">
            <i data-lucide="bar-chart-2" style="width: 14px; height: 14px;"></i>
            Performance Impact
          </div>
          <h2 class="slide-title">업무 단계별 <span class="highlight-amber">개발 및 기획 생산성 격차</span></h2>
          <p class="slide-subtitle">에이전트 파이프라인 도입 기업의 프로젝트 소요 시간 절감 효과 (단위: 시간)</p>
        </div>
        <div class="content">
          <div class="chart-container" data-step="1">
            <div id="productivityChart" style="width: 100%; height: 100%;"></div>
          </div>
        </div>
      </section>

      <!-- Slide 4: Key Pillars -->
      <section class="slide" id="slide-4">
        <div class="slide-header">
          <div class="badge">
            <i data-lucide="layers" style="width: 14px; height: 14px;"></i>
            Architecture Pillars
          </div>
          <h2 class="slide-title">성공적인 도입을 위한 <span class="highlight-amber">4대 핵심 기술 축</span></h2>
          <p class="slide-subtitle">안정성과 보안, 추론 품질을 동시에 보장하는 엔터프라이즈 에이전트 요건</p>
        </div>
        <div class="content">
          <div class="grid-4">
            <div class="glass-card" data-step="1">
              <div class="card-icon"><i data-lucide="shield"></i></div>
              <h3 class="card-title">안전한 격리 샌드박스</h3>
              <p class="card-desc">격리된 컨테이너 환경에서 코드를 실행하여 인프라 위협 원천 차단</p>
            </div>
            <div class="glass-card" data-step="2">
              <div class="card-icon"><i data-lucide="fast-forward"></i></div>
              <h3 class="card-title">초저지연 모델</h3>
              <p class="card-desc">gemini-2.5-flash-lite 기반의 신속한 다단계 추론으로 대기 시간 단축</p>
            </div>
            <div class="glass-card" data-step="3">
              <div class="card-icon"><i data-lucide="file-check"></i></div>
              <h3 class="card-title">엄격한 교차 검증</h3>
              <p class="card-desc">기획-구현-QA 에이전트 간 릴레이 파일 검토로 할루시네이션 방지</p>
            </div>
            <div class="glass-card" data-step="4">
              <div class="card-icon"><i data-lucide="repeat"></i></div>
              <h3 class="card-title">피드백 루프 자동화</h3>
              <p class="card-desc">테스트 실패 시 자동 디버깅 및 자율 수정(Self-Correction) 메커니즘</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Slide 5: Conclusion -->
      <section class="slide" id="slide-5">
        <div class="slide-header">
          <div class="badge">
            <i data-lucide="rocket" style="width: 14px; height: 14px;"></i>
            Execution Roadmap
          </div>
          <h2 class="slide-title">2026년 기업의 <span class="highlight-amber">Next Action Plan</span></h2>
          <p class="slide-subtitle">지금 바로 착수해야 할 실행 과제와 궁극적 기대 성과</p>
        </div>
        <div class="content">
          <div class="grid-2">
            <div class="glass-card" data-step="1">
              <div class="card-icon"><i data-lucide="check-circle-2"></i></div>
              <h3 class="card-title">즉시 실행 3대 과제</h3>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; margin-top: 10px; color: var(--text-dim); line-height: 1.6;">
                <li><strong style="color: var(--accent);">1. 사내 프롬프트 & 스킬 자산화:</strong> 반복 업무의 규격화</li>
                <li><strong style="color: var(--accent);">2. 하이브리드 LLM 파이프라인:</strong> Flash Lite로 속도 극대화</li>
                <li><strong style="color: var(--accent);">3. 자동화된 가드레일 & 보안:</strong> 환경변수 및 키 관리 분리</li>
              </ul>
            </div>
            <div class="glass-card" data-step="2" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(30, 41, 59, 0.8) 100%);">
              <div class="card-icon"><i data-lucide="trending-up"></i></div>
              <div class="metric-value">10x</div>
              <h3 class="card-title">출시 속도와 생산성 향상</h3>
              <p class="card-desc">기획부터 배포까지의 사이클을 일주일 단위에서 몇 분 단위로 압축하여 비즈니스 적응력을 확보합니다.</p>
            </div>
          </div>
        </div>
      </section>

    </div>

    <!-- HUD Overlay -->
    <div id="hud-overlay">
      <div class="hud-left">
        <div class="hud-logo">
          <i data-lucide="layers" style="width: 16px; height: 16px; color: var(--accent);"></i>
          ANTIGRAVITY SLIDES
        </div>
        <div class="hud-indicator" id="slide-indicator">01 / 05</div>
      </div>
      <div class="hud-center">
        <div class="progress-track">
          <div id="progress-fill"></div>
        </div>
      </div>
      <div class="hud-right">
        <button class="oval-toggle" id="theme-toggle" title="테마 전환 (다크/라이트)">
          <div class="oval-knob">
            <i data-lucide="moon" id="theme-icon" style="width: 12px; height: 12px;"></i>
          </div>
        </button>
        <button class="hud-btn" id="btn-home" title="첫 슬라이드 (Home)">
          <i data-lucide="skip-back" style="width: 18px; height: 18px;"></i>
        </button>
        <button class="hud-btn" id="btn-prev" title="이전 슬라이드 (←)">
          <i data-lucide="chevron-left" style="width: 20px; height: 20px;"></i>
        </button>
        <button class="hud-btn" id="btn-next" title="다음 슬라이드 (→)">
          <i data-lucide="chevron-right" style="width: 20px; height: 20px;"></i>
        </button>
        <button class="hud-btn" id="btn-print" title="PDF 인쇄 / 저장 (P)">
          <i data-lucide="printer" style="width: 18px; height: 18px;"></i>
        </button>
        <button class="hud-btn" id="btn-help" title="단축키 안내 (?)">
          <i data-lucide="help-circle" style="width: 18px; height: 18px;"></i>
        </button>
      </div>
    </div>

    <!-- Help Modal -->
    <div class="modal-overlay" id="help-modal">
      <div class="modal-card">
        <div class="modal-header">
          <h3 class="modal-title">키보드 단축키 안내</h3>
          <button class="modal-close" id="modal-close-btn">&times;</button>
        </div>
        <div class="shortcuts-grid">
          <div class="shortcut-item"><span>다음 슬라이드</span><kbd>→</kbd> <kbd>Space</kbd></div>
          <div class="shortcut-item"><span>이전 슬라이드</span><kbd>←</kbd></div>
          <div class="shortcut-item"><span>첫 슬라이드로</span><kbd>Home</kbd></div>
          <div class="shortcut-item"><span>끝 슬라이드로</span><kbd>End</kbd></div>
          <div class="shortcut-item"><span>PDF 인쇄</span><kbd>P</kbd> <kbd>Ctrl+P</kbd></div>
          <div class="shortcut-item"><span>도움말 닫기</span><kbd>ESC</kbd></div>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-dim); text-align: center;">
          💡 PDF 인쇄 시 브라우저 인쇄 옵션에서 <strong>배경 그래픽</strong>을 반드시 켜주세요.
        </p>
      </div>
    </div>

  </div>

  <script>
    class Presentation {
      constructor() {
        this.slides = Array.from(document.querySelectorAll('.slide'));
        this.totalSlides = this.slides.length;
        // CRITICAL BUG FIX: 첫 슬라이드 애니메이션 누락 방지를 위해 -1로 초기화
        this.currentIndex = -1;
        this.isAnimating = false;
        this.chartInstance = null;

        this.init();
      }

      init() {
        if (window.lucide) {
          lucide.createIcons();
        }

        this.initScaling();
        window.addEventListener('resize', () => this.initScaling());

        // Event Listeners
        document.getElementById('btn-prev').addEventListener('click', () => this.prev());
        document.getElementById('btn-next').addEventListener('click', () => this.next());
        document.getElementById('btn-home').addEventListener('click', () => this.goto(0));
        document.getElementById('btn-print').addEventListener('click', () => this.exportPDF());
        document.getElementById('btn-help').addEventListener('click', () => this.toggleHelp());
        document.getElementById('modal-close-btn').addEventListener('click', () => this.toggleHelp(false));
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());

        // Keyboard Navigation
        window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            this.toggleHelp(false);
            return;
          }
          if (e.key === '?' || e.key === '/') {
            this.toggleHelp();
            return;
          }
          if (document.getElementById('help-modal').classList.contains('active')) {
            return;
          }
          if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) {
            e.preventDefault();
            this.next();
          } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
            e.preventDefault();
            this.prev();
          } else if (e.key === 'Home') {
            e.preventDefault();
            this.goto(0);
          } else if (e.key === 'End') {
            e.preventDefault();
            this.goto(this.totalSlides - 1);
          } else if (e.key.toLowerCase() === 'p' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            this.exportPDF();
          }
        });

        // Hash Navigation
        window.addEventListener('hashchange', () => this.handleHash());

        // Print handlers
        window.addEventListener('beforeprint', () => {
          const pres = document.getElementById('presentation');
          if (pres) pres.style.transform = 'none';
        });
        window.addEventListener('afterprint', () => {
          this.initScaling();
        });

        this.handleHash();
      }

      initScaling() {
        const pres = document.getElementById('presentation');
        if (!pres) return;
        const scale = Math.min(window.innerWidth / 1400, window.innerHeight / 787.5) * 0.92;
        pres.style.transform = 'scale(' + scale + ')';
      }

      handleHash() {
        const hash = window.location.hash;
        const match = hash.match(/#slide-(\\d+)/);
        const targetIndex = match ? parseInt(match[1], 10) - 1 : 0;
        this.goto(Math.max(0, Math.min(targetIndex, this.totalSlides - 1)));
      }

      goto(index) {
        if (index === this.currentIndex || this.isAnimating) return;
        this.isAnimating = true;

        if (this.currentIndex >= 0 && this.slides[this.currentIndex]) {
          this.slides[this.currentIndex].classList.remove('active');
        }

        this.currentIndex = index;
        const targetSlide = this.slides[this.currentIndex];
        targetSlide.classList.add('active');

        // Update URL Hash
        window.location.hash = '#slide-' + (this.currentIndex + 1);

        // Update HUD
        const currentStr = String(this.currentIndex + 1).padStart(2, '0');
        const totalStr = String(this.totalSlides).padStart(2, '0');
        document.getElementById('slide-indicator').textContent = currentStr + ' / ' + totalStr;
        const progress = ((this.currentIndex + 1) / this.totalSlides) * 100;
        document.getElementById('progress-fill').style.width = progress + '%';

        // Automatic Sequential Reveal
        this.triggerSteps(targetSlide);

        // Render Chart if Slide 3
        if (this.currentIndex === 2) {
          setTimeout(() => this.renderProductivityChart(), 200);
        }

        setTimeout(() => {
          this.isAnimating = false;
        }, 400);
      }

      triggerSteps(slide) {
        const steps = Array.from(slide.querySelectorAll('[data-step]'));
        steps.forEach(el => el.classList.remove('visible'));

        steps.forEach((el, i) => {
          setTimeout(() => {
            el.classList.add('visible');
          }, (i + 1) * 180);
        });
      }

      next() {
        if (this.currentIndex < this.totalSlides - 1) {
          this.goto(this.currentIndex + 1);
        }
      }

      prev() {
        if (this.currentIndex > 0) {
          this.goto(this.currentIndex - 1);
        }
      }

      toggleHelp(force) {
        const modal = document.getElementById('help-modal');
        if (typeof force === 'boolean') {
          modal.classList.toggle('active', force);
        } else {
          modal.classList.toggle('active');
        }
      }

      toggleTheme() {
        const html = document.documentElement;
        const isDark = html.getAttribute('data-theme') === 'dark';
        const nextTheme = isDark ? 'light' : 'dark';
        html.setAttribute('data-theme', nextTheme);

        const icon = document.getElementById('theme-icon');
        if (icon) {
          icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
          if (window.lucide) lucide.createIcons();
        }

        if (this.chartInstance) {
          this.chartInstance.updateOptions({
            theme: { mode: nextTheme }
          });
        }
      }

      renderProductivityChart() {
        const chartEl = document.getElementById('productivityChart');
        if (!chartEl || this.chartInstance) return;

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const options = {
          series: [
            { name: '기존 수동 프로세스', data: [45, 60, 30, 40] },
            { name: 'AI 에이전트 협업', data: [6, 8, 4, 3] }
          ],
          chart: {
            type: 'bar',
            height: '100%',
            fontFamily: 'Inter, sans-serif',
            toolbar: { show: false },
            background: 'transparent',
            animations: { enabled: true, easing: 'easeinout', speed: 800 }
          },
          colors: ['#64748b', '#f59e0b'],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '45%',
              borderRadius: 8
            }
          },
          dataLabels: { enabled: false },
          stroke: { show: true, width: 2, colors: ['transparent'] },
          xaxis: {
            categories: ['요구사항 기획', '코드 아키텍처/구현', 'QA 및 테스트', '배포 및 문서화'],
            labels: { style: { colors: isDark ? '#94a3b8' : '#64748b', fontSize: '12px' } }
          },
          yaxis: {
            title: { text: '소요 시간 (Hours)', style: { color: isDark ? '#94a3b8' : '#64748b' } },
            labels: { style: { colors: isDark ? '#94a3b8' : '#64748b' } }
          },
          fill: { opacity: 1 },
          legend: {
            position: 'top',
            labels: { colors: isDark ? '#f8fafc' : '#0f172a' }
          },
          grid: {
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
          },
          theme: { mode: isDark ? 'dark' : 'light' }
        };

        this.chartInstance = new ApexCharts(chartEl, options);
        this.chartInstance.render();
      }

      exportPDF() {
        if (this.chartInstance) {
          this.chartInstance.updateOptions({ animations: { enabled: false } });
        }
        window.print();
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      window.presentation = new Presentation();
    });
  </script>
</body>
</html>`;
