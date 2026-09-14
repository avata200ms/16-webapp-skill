'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  BarChart3,
  Layers,
  Users,
  SunMoon,
  FileText,
  Wand2,
  Lightbulb,
} from 'lucide-react';

interface PromptInputPanelProps {
  onGenerate: (data: {
    prompt: string;
    slideCount: number;
    topic: string;
    includeChart: boolean;
    audience: string;
    theme: 'dark' | 'light';
  }) => Promise<void>;
  isLoading: boolean;
  loadingStep: string;
}

const PRESETS = [
  {
    title: '⚡ 2026 수소 산업 전망',
    topic: '2026 수소 산업 전망 & 청정 에너지 생태계 로드맵',
    prompt: `2026년 글로벌 및 국내 수소 산업 전망과 청정 수소 생태계 전환 로드맵을 위한 5장의 발표 자료를 기획해줘.
1. 도입 및 비전: 실증 연구를 넘어 상용화 원년으로 - 청정수소 발전 의무화(CHPS)와 대규모 수전해 및 인프라 대전환
2. 시장 및 3대 밸류체인 진화: 생산(GW급 대규모 수전해 및 LCOH $3/kg 진입), 유통(액화수소 플랜트 가동), 활용(수소 혼소 발전 및 상용 모빌리티)
3. 수소 생산단가 및 시장 성장 데이터 비교: 그레이 수소 vs 블루 수소 vs 그린 수소 연도별(2022, 2024, 2026, 2030) 균등화 생산 원가($/kg) 비교 차트
4. 4대 핵심 기술 축: PEM 고효율 수전해, 극저온 액화수소 단열 탱크, 고내구 MEA 연료전지, 50% 수소 혼소 터빈
5. 결론 및 선제적 실행 전략: 청정수소 공급망 파트너십 구축, 발전 입찰 시장 참여, 온실가스 배출량 65% 감축 달성`,
    slideCount: 5,
    includeChart: true,
    audience: '경영진 및 에너지 투자자',
  },
  {
    title: '🤖 2026 AI 에이전트 트렌드',
    topic: '2026 AI Agent Trends & Productivity Revolution',
    prompt: `2026년 기업형 AI 에이전트 도입 트렌드와 생산성 혁신 방안에 대한 전략 발표 슬라이드를 기획해줘.
1. 도입 배경: 단순 챗봇에서 다중 에이전트 자율 협업 팀으로의 패러다임 전환
2. 시장 및 기술 현황: 도구 연동, 컨테이너 샌드박스, 피드백 루프 자동화
3. 성과 지표: 기존 수동 프로세스 대비 개발/기획/QA 소요 시간 절감 데이터 비교 차트
4. 성공 요건: 사내 프롬프트 및 스킬 자산화, 초저지연 Flash 모델 활용, 보안 가드레일
5. 결론: 즉시 착수해야 할 기업의 3대 액션 플랜`,
    slideCount: 5,
    includeChart: true,
    audience: '경영진 및 테크 리드',
  },
  {
    title: '🚀 스타트업 시드 IR 피치덱',
    topic: 'NextGen AI Workspace IR Pitch Deck',
    prompt: `스타트업 시드 투자 유치를 위한 5장짜리 핵심 피치덱을 기획해줘.
1. 문제 정의: 기업 내 반복적인 웹 문서/슬라이드 제작으로 인한 막대한 공수 낭비
2. 솔루션: 자연어 기획안 한 줄로 16:9 반응형 웹 슬라이드를 자동 완성하는 AI 플랫폼
3. 시장 규모 및 성장성: 연간 25% 성장하는 글로벌 프레젠테이션 소프트웨어 시장
4. 비즈니스 모델 및 트랙션: 월간 구독(MRR) 및 엔터프라이즈 전용 온프레미스 라이선스
5. 팀 역량 및 투자 요청: 15억 원 Seed 라운드 펀딩 계획과 마일스톤`,
    slideCount: 5,
    includeChart: true,
    audience: '벤처캐피털(VC) 심사역',
  },
  {
    title: '☁️ 클라우드 마이그레이션 로드맵',
    topic: 'Enterprise Cloud Modernization & Cost Optimization',
    prompt: `레거시 모놀리식 시스템의 현대화 및 클라우드 네이티브 전환 전략을 위한 사내 테크 세미나 발표 자료.
1. 배경: 온프레미스 인프라 노후화와 유지보수 비용 급증
2. 전환 목표: MSA 분리, 컨테이너화, 오토스케일링을 통한 99.99% 가용성
3. 비용 및 리소스 비교: 인프라 전환 전/후 서버 운영비 및 복구 시간 차트 비교
4. 단계별 실행 일정: 파일럿 프로젝트부터 전면 컷오버까지의 4단계 마일스톤
5. 모범 사례 및 사내 지원 체계`,
    slideCount: 5,
    includeChart: true,
    audience: '사내 개발자 및 인프라 엔지니어',
  },
];

export default function PromptInputPanel({
  onGenerate,
  isLoading,
  loadingStep,
}: PromptInputPanelProps) {
  const [topic, setTopic] = useState('2026 수소 산업 전망 & 청정 에너지 생태계 로드맵');
  const [prompt, setPrompt] = useState(
    `2026년 글로벌 및 국내 수소 산업 전망과 청정 수소 생태계 전환 로드맵을 위한 5장의 발표 자료를 기획해줘.
1. 도입 및 비전: 실증 연구를 넘어 상용화 원년으로 - 청정수소 발전 의무화(CHPS)와 대규모 수전해 및 인프라 대전환
2. 시장 및 3대 밸류체인 진화: 생산(GW급 대규모 수전해 및 LCOH $3/kg 진입), 유통(액화수소 플랜트 가동), 활용(수소 혼소 발전 및 상용 모빌리티)
3. 수소 생산단가 및 시장 성장 데이터 비교: 그레이 수소 vs 블루 수소 vs 그린 수소 연도별(2022, 2024, 2026, 2030) 균등화 생산 원가($/kg) 비교 차트
4. 4대 핵심 기술 축: PEM 고효율 수전해, 극저온 액화수소 단열 탱크, 고내구 MEA 연료전지, 50% 수소 혼소 터빈
5. 결론 및 선제적 실행 전략: 청정수소 공급망 파트너십 구축, 발전 입찰 시장 참여, 온실가스 배출량 65% 감축 달성`
  );
  const [slideCount, setSlideCount] = useState(5);
  const [includeChart, setIncludeChart] = useState(true);
  const [audience, setAudience] = useState('경영진 및 에너지 투자자');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    await onGenerate({
      prompt: prompt.trim(),
      slideCount,
      topic: topic.trim(),
      includeChart,
      audience,
      theme,
    });
  };

  const applyPreset = (preset: (typeof PRESETS)[0]) => {
    setTopic(preset.topic);
    setPrompt(preset.prompt);
    setSlideCount(preset.slideCount);
    setIncludeChart(preset.includeChart);
    setAudience(preset.audience);
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '24px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        overflowY: 'auto',
      }}
    >
      {/* Panel Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Wand2 size={18} color="var(--amber-primary)" />
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              fontWeight: 700,
            }}
          >
            슬라이드 기획안 입력
          </h2>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          슬라이드에 담을 주제, 목차, 데이터 등을 자연어로 입력하면 Gemini가 16:9 규격에 맞춰 제작합니다.
        </p>
      </div>

      {/* Preset Chips */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            color: 'var(--text-dim)',
            marginBottom: '8px',
          }}
        >
          <Lightbulb size={13} />
          빠른 시작 프리셋:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(p)}
              className="btn btn-secondary"
              style={{
                fontSize: '0.78rem',
                padding: '6px 12px',
                borderRadius: '9999px',
                background: 'rgba(30, 41, 59, 0.4)',
              }}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
        {/* Topic Input */}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              marginBottom: '6px',
            }}
          >
            슬라이드 대표 주제 (선택)
          </label>
          <input
            type="text"
            className="input-textarea"
            style={{ padding: '10px 14px', height: 'auto' }}
            placeholder="예: 2026 AI 에이전트 도입 전략 및 로드맵"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        {/* Prompt Input */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <label
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              marginBottom: '6px',
            }}
          >
            <span>기획안 상세 텍스트 (필수)</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              {prompt.length}자 입력됨
            </span>
          </label>
          <textarea
            className="input-textarea"
            style={{ flex: 1, minHeight: '180px' }}
            placeholder="슬라이드에 포함하고 싶은 개요, 배경, 세부 항목, 통계 지표, 결론 등을 자유롭게 작성하세요..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
        </div>

        {/* Options Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            background: 'rgba(15, 23, 42, 0.5)',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {/* Slide Count */}
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                marginBottom: '6px',
              }}
            >
              <Layers size={14} color="var(--amber-primary)" />
              슬라이드 장수: <strong style={{ color: '#fff' }}>{slideCount}장</strong>
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[3, 4, 5, 6, 8].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setSlideCount(count)}
                  style={{
                    flex: 1,
                    padding: '6px 0',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor:
                      slideCount === count
                        ? 'var(--amber-primary)'
                        : 'var(--border-subtle)',
                    background:
                      slideCount === count
                        ? 'rgba(245, 158, 11, 0.2)'
                        : 'transparent',
                    color: slideCount === count ? 'var(--amber-primary)' : 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                >
                  {count}p
                </button>
              ))}
            </div>
          </div>

          {/* Chart Toggle */}
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                marginBottom: '6px',
              }}
            >
              <BarChart3 size={14} color="var(--accent-blue)" />
              ApexCharts 시각화
            </label>
            <button
              type="button"
              onClick={() => setIncludeChart(!includeChart)}
              style={{
                width: '100%',
                padding: '7px 12px',
                fontSize: '0.8rem',
                fontWeight: 600,
                borderRadius: '6px',
                border: '1px solid',
                borderColor: includeChart
                  ? 'rgba(56, 189, 248, 0.4)'
                  : 'var(--border-subtle)',
                background: includeChart
                  ? 'rgba(56, 189, 248, 0.15)'
                  : 'transparent',
                color: includeChart ? 'var(--accent-blue)' : 'var(--text-dim)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              {includeChart ? '✓ 인터랙티브 차트 포함' : '차트 제외 (텍스트 중심)'}
            </button>
          </div>

          {/* Audience Target */}
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                marginBottom: '6px',
              }}
            >
              <Users size={14} />
              청중 대상
            </label>
            <select
              className="input-select"
              style={{ width: '100%', height: '34px' }}
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            >
              <option value="경영진 및 임원">경영진 및 임원 (비즈니스 임팩트)</option>
              <option value="개발자 및 엔지니어">개발자 및 엔지니어 (기술 세부)</option>
              <option value="투자자 (VC/IR)">투자자 (성장성 및 지표)</option>
              <option value="일반 대중 및 고객">일반 대중 및 고객 (직관적 이해)</option>
            </select>
          </div>

          {/* Default Theme */}
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                marginBottom: '6px',
              }}
            >
              <SunMoon size={14} />
              시작 테마
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                style={{
                  flex: 1,
                  padding: '6px 0',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor:
                    theme === 'dark' ? 'var(--amber-primary)' : 'var(--border-subtle)',
                  background:
                    theme === 'dark' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                  color: theme === 'dark' ? 'var(--amber-primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >
                Dark (Slate)
              </button>
              <button
                type="button"
                onClick={() => setTheme('light')}
                style={{
                  flex: 1,
                  padding: '6px 0',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor:
                    theme === 'light' ? 'var(--amber-primary)' : 'var(--border-subtle)',
                  background:
                    theme === 'light' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                  color: theme === 'light' ? 'var(--amber-primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >
                Light
              </button>
            </div>
          </div>
        </div>

        {/* Loading Progress or Submit Button */}
        {isLoading ? (
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid var(--amber-primary)',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--amber-primary)' }}>
                Gemini 2.5 Flash Lite 생성 중...
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {loadingStep || 'web-slide-creator 규격에 맞춰 고성능 웹 코드를 합성하고 있습니다.'}
            </p>
            <div
              className="shimmer"
              style={{
                width: '100%',
                height: '4px',
                borderRadius: '9999px',
                marginTop: '4px',
              }}
            />
          </div>
        ) : (
          <button
            type="submit"
            className="btn btn-primary pulse-glow"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '1rem',
              fontWeight: 700,
            }}
          >
            <Sparkles size={18} />
            Gemini 2.5 Flash Lite로 슬라이드 생성하기
          </button>
        )}
      </form>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
