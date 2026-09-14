'use client';

import React from 'react';
import { X, Trash2, Calendar, Layers, ExternalLink } from 'lucide-react';
import { SavedPresentation } from '@/lib/storage';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: SavedPresentation[];
  onSelect: (item: SavedPresentation) => void;
  onDelete: (id: string) => void;
}

export default function HistoryDrawer({
  isOpen,
  onClose,
  items,
  onSelect,
  onDelete,
}: HistoryDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(9, 13, 22, 0.75)',
        backdropFilter: 'blur(10px)',
        zIndex: 900,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100%',
          backgroundColor: '#0f172a',
          borderLeft: '1px solid var(--border-subtle)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            paddingBottom: '14px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="var(--amber-primary)" />
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.15rem',
                fontWeight: 700,
              }}
            >
              생성 슬라이드 보관함
            </h3>
            <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
              {items.length}개
            </span>
          </div>

          <button
            onClick={onClose}
            className="btn btn-ghost"
            style={{ padding: '6px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--text-dim)',
                fontSize: '0.9rem',
              }}
            >
              아직 보관된 슬라이드가 없습니다.<br />기획안을 입력하여 첫 슬라이드를 생성해 보세요!
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => {
                  onSelect(item);
                  onClose();
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
                  e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                  <h4
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                    className="btn btn-ghost"
                    style={{
                      padding: '4px',
                      color: 'var(--text-dim)',
                    }}
                    title="보관함에서 삭제"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <p
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-dim)',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: 1.4,
                  }}
                >
                  {item.prompt}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.72rem',
                    color: 'var(--text-dim)',
                    marginTop: '4px',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} />
                    {new Date(item.createdAt).toLocaleDateString('ko-KR')}
                  </span>
                  <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>
                    {item.slideCount} SLIDES
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
