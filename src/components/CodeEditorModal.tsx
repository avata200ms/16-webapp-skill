'use client';

import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Play, FileCode } from 'lucide-react';

interface CodeEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode: string;
  onApplyCode: (updatedCode: string) => void;
}

export default function CodeEditorModal({
  isOpen,
  onClose,
  initialCode,
  onApplyCode,
}: CodeEditorModalProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    onApplyCode(code);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(9, 13, 22, 0.85)',
        backdropFilter: 'blur(16px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '95%',
          maxWidth: '1100px',
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#0f172a',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(15, 23, 42, 0.9)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileCode size={20} color="var(--amber-primary)" />
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 700,
              }}
            >
              생성된 웹 슬라이드 단일 HTML 소스 코드
            </h3>
            <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
              Standalone HTML5
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleCopy}
              className="btn btn-secondary"
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
              {copied ? '복사 완료!' : '전체 복사'}
            </button>

            <button
              onClick={handleApply}
              className="btn btn-primary"
              style={{ fontSize: '0.8rem', padding: '6px 14px' }}
            >
              <Play size={14} />
              수정 사항 프리뷰에 적용
            </button>

            <button
              onClick={onClose}
              className="btn btn-ghost"
              style={{ padding: '6px' }}
              title="닫기 (ESC)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Code Textarea */}
        <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#090d16',
              color: '#e2e8f0',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              lineHeight: 1.5,
              padding: '16px',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              resize: 'none',
              outline: 'none',
            }}
            spellCheck={false}
          />
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '10px 24px',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.78rem',
            color: 'var(--text-dim)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>💡 HTML 구조, 스타일, 또는 차트 데이터를 자유롭게 편집할 수 있습니다.</span>
          <span>총 {code.length.toLocaleString()}자</span>
        </div>
      </div>
    </div>
  );
}
