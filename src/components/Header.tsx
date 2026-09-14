'use client';

import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  Layers,
  History,
  FileCode,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  BookOpen,
} from 'lucide-react';

interface HeaderProps {
  onOpenHistory: () => void;
  onLoadSample: () => void;
  onNewPresentation: () => void;
  historyCount: number;
}

export default function Header({
  onOpenHistory,
  onLoadSample,
  onNewPresentation,
  historyCount,
}: HeaderProps) {
  const [apiStatus, setApiStatus] = useState<{
    configured: boolean;
    maskedKey?: string;
    loading: boolean;
  }>({
    configured: false,
    loading: true,
  });

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setApiStatus({
          configured: Boolean(data.apiKeyConfigured),
          maskedKey: data.apiKeyMasked,
          loading: false,
        });
      })
      .catch(() => {
        setApiStatus({ configured: false, loading: false });
      });
  }, []);

  return (
    <header
      style={{
        width: '100%',
        height: '70px',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'rgba(9, 13, 22, 0.85)',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
      }}
    >
      {/* Brand Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background:
              'linear-gradient(135deg, var(--amber-primary) 0%, #fbbf24 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0f172a',
            boxShadow: '0 4px 14px var(--amber-glow)',
          }}
        >
          <Layers size={22} strokeWidth={2.5} />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#fff',
              }}
            >
              Gemini Slide Studio
            </h1>
            <span className="badge badge-amber">
              <Sparkles size={11} />
              gemini-2.5-flash-lite
            </span>
            <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>
              web-slide-creator v3.0
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            기획 텍스트를 16:9 반응형 웹 프레젠테이션으로 즉시 변환
          </p>
        </div>
      </div>

      {/* Actions & Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* API Key Status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(30, 41, 59, 0.5)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.8rem',
          }}
          title={
            apiStatus.configured
              ? `API Key 정상 연동 (${apiStatus.maskedKey})`
              : '.env 파일의 GEMINI_API_KEY 확인 필요'
          }
        >
          {apiStatus.loading ? (
            <span style={{ color: 'var(--text-dim)' }}>확인 중...</span>
          ) : apiStatus.configured ? (
            <>
              <CheckCircle2 size={14} color="var(--accent-emerald)" />
              <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
                API 연동됨 ({apiStatus.maskedKey})
              </span>
            </>
          ) : (
            <>
              <AlertCircle size={14} color="#ef4444" />
              <span style={{ color: '#ef4444', fontWeight: 600 }}>
                API Key 미감지 (.env)
              </span>
            </>
          )}
        </div>

        {/* Load Sample Button */}
        <button
          onClick={onLoadSample}
          className="btn btn-secondary"
          style={{ fontSize: '0.85rem', padding: '8px 14px' }}
          title="web-slide-creator 표준 데모 슬라이드를 즉시 불러옵니다."
        >
          <BookOpen size={15} />
          샘플 데모 로드
        </button>

        {/* History Button */}
        <button
          onClick={onOpenHistory}
          className="btn btn-secondary"
          style={{ fontSize: '0.85rem', padding: '8px 14px' }}
        >
          <History size={15} />
          보관함 ({historyCount})
        </button>

        {/* New Button */}
        <button
          onClick={onNewPresentation}
          className="btn btn-primary"
          style={{ fontSize: '0.85rem', padding: '8px 14px' }}
        >
          <PlusCircle size={15} />
          새 기획 작성
        </button>
      </div>
    </header>
  );
}
