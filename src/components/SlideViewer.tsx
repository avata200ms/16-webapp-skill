'use client';

import React, { useRef } from 'react';
import {
  Maximize2,
  Download,
  Code,
  Printer,
  ExternalLink,
  Layers,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface SlideViewerProps {
  title: string;
  slideCount: number;
  html: string;
  onOpenEditor: () => void;
}

export default function SlideViewer({
  title,
  slideCount,
  html,
  onOpenEditor,
}: SlideViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 새 창에서 전체화면 프레젠테이션 열기
  const handleOpenFullscreenWindow = () => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.open();
      newWindow.document.write(html);
      newWindow.document.close();
    }
  };

  // 단일 HTML 파일 다운로드
  const handleDownloadHtml = () => {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeTitle = (title || 'presentation')
      .replace(/[^a-zA-Z0-9가-힣_-]/g, '_')
      .slice(0, 30);
    link.href = url;
    link.download = `${safeTitle}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // PDF 인쇄 (iframe 내부 print 호출)
  const handlePrint = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.focus();
      iframeRef.current.contentWindow.print();
    }
  };

  return (
    <div
      className="glass-panel"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Viewer Toolbar */}
      <div
        style={{
          padding: '12px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(15, 23, 42, 0.7)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
          <span className="badge badge-amber" style={{ fontSize: '0.72rem' }}>
            <Layers size={12} />
            {slideCount} SLIDES
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '320px',
            }}
            title={title}
          >
            {title || 'Gemini Presentation'}
          </h2>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onOpenEditor}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            title="생성된 단일 HTML 소스 코드를 확인하고 직접 편집합니다."
          >
            <Code size={14} />
            코드 편집
          </button>

          <button
            onClick={handleDownloadHtml}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            title="외부 의존성 없이 오프라인 브라우저에서 바로 열 수 있는 .html 파일을 다운로드합니다."
          >
            <Download size={14} />
            HTML 다운로드
          </button>

          <button
            onClick={handlePrint}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            title="브라우저 인쇄를 통해 고해상도 PDF로 내보냅니다."
          >
            <Printer size={14} />
            PDF 인쇄
          </button>

          <button
            onClick={handleOpenFullscreenWindow}
            className="btn btn-primary"
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            title="새 탭에서 꽉 찬 16:9 프레젠테이션 모드로 실행합니다."
          >
            <Maximize2 size={14} />
            새 창 발표 모드
          </button>
        </div>
      </div>

      {/* 16:9 Responsive Iframe Container */}
      <div
        style={{
          flex: 1,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #090d16 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <iframe
            ref={iframeRef}
            srcDoc={html}
            title={title}
            sandbox="allow-scripts allow-modals allow-same-origin allow-popups"
            style={{
              width: '100%',
              height: '100%',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              backgroundColor: '#0f172a',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
            }}
          />
        </div>

        {/* Bottom Hint */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.75rem',
            color: 'var(--text-dim)',
            background: 'rgba(15, 23, 42, 0.75)',
            padding: '4px 10px',
            borderRadius: '9999px',
            pointerEvents: 'none',
          }}
        >
          <span>미리보기 안을 클릭한 후</span>
          <kbd style={{ background: '#1e293b', padding: '2px 5px', borderRadius: '4px', color: 'var(--amber-primary)' }}>←</kbd>
          <kbd style={{ background: '#1e293b', padding: '2px 5px', borderRadius: '4px', color: 'var(--amber-primary)' }}>→</kbd>
          <span>키 또는 하단 HUD로 슬라이드를 넘길 수 있습니다.</span>
        </div>
      </div>
    </div>
  );
}
