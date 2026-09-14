'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PromptInputPanel from '@/components/PromptInputPanel';
import SlideViewer from '@/components/SlideViewer';
import CodeEditorModal from '@/components/CodeEditorModal';
import HistoryDrawer from '@/components/HistoryDrawer';
import {
  HYDROGEN_PRESENTATION_TITLE,
  HYDROGEN_SLIDE_HTML,
} from '@/lib/hydrogen-deck';
import {
  SAMPLE_PRESENTATION_TITLE,
  SAMPLE_SLIDE_HTML,
} from '@/lib/sample-deck';
import {
  getSavedPresentations,
  savePresentation,
  deletePresentation,
  SavedPresentation,
} from '@/lib/storage';

export default function Home() {
  const [currentTitle, setCurrentTitle] = useState(HYDROGEN_PRESENTATION_TITLE);
  const [currentHtml, setCurrentHtml] = useState(HYDROGEN_SLIDE_HTML);
  const [currentSlideCount, setCurrentSlideCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyItems, setHistoryItems] = useState<SavedPresentation[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 초기 로드 시 로컬 저장소 히스토리 로드
  useEffect(() => {
    const saved = getSavedPresentations();
    setHistoryItems(saved);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 슬라이드 생성 요청 핸들러 (Gemini 2.5 Flash Lite 호출)
  const handleGenerate = async (params: {
    prompt: string;
    slideCount: number;
    topic: string;
    includeChart: boolean;
    audience: string;
    theme: 'dark' | 'light';
  }) => {
    setIsLoading(true);
    setLoadingStep('1/4: 기획안 분석 및 발표 구조화 중...');

    const stepTimer1 = setTimeout(() => {
      setLoadingStep('2/4: web-slide-creator 16:9 황금비율 레이아웃 설계 중...');
    }, 2500);

    const stepTimer2 = setTimeout(() => {
      setLoadingStep('3/4: ApexCharts 데이터 시각화 및 Amber-Slate 디자인 시스템 주입 중...');
    }, 6000);

    const stepTimer3 = setTimeout(() => {
      setLoadingStep('4/4: 단일 실행형 HTML5 코드 검증 및 렌더링 중...');
    }, 11000);

    try {
      const response = await fetch('/api/generate-slide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result?.error?.message || '슬라이드 생성 중 문제가 발생했습니다.'
        );
      }

      const generatedData = result.data;
      setCurrentTitle(generatedData.title);
      setCurrentHtml(generatedData.html);
      setCurrentSlideCount(generatedData.slideCount);

      // LocalStorage에 자동 저장
      const saved = savePresentation({
        title: generatedData.title,
        prompt: params.prompt,
        slideCount: generatedData.slideCount,
        includeChart: params.includeChart,
        html: generatedData.html,
      });

      setHistoryItems(getSavedPresentations());
      showToast(`🎉 "${generatedData.title}" 슬라이드가 성공적으로 생성되었습니다!`);
    } catch (err: any) {
      console.error(err);
      showToast(`⚠️ 오류: ${err.message}`);
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  // 샘플 로드
  const handleLoadSample = () => {
    setCurrentTitle(HYDROGEN_PRESENTATION_TITLE);
    setCurrentHtml(HYDROGEN_SLIDE_HTML);
    setCurrentSlideCount(5);
    showToast('⚡ 2026 수소 산업 전망 표준 슬라이드를 불러왔습니다.');
  };

  // 새 프레젠테이션 초기화
  const handleNewPresentation = () => {
    setCurrentTitle('새 프레젠테이션');
    setCurrentHtml(SAMPLE_SLIDE_HTML);
    setCurrentSlideCount(5);
    showToast('📝 새로운 슬라이드 작성을 시작합니다.');
  };

  // 코드 수정 사항 적용
  const handleApplyUpdatedCode = (updatedCode: string) => {
    setCurrentHtml(updatedCode);
    showToast('✅ 수정된 HTML 코드가 미리보기에 즉시 적용되었습니다.');
  };

  // 히스토리 선택
  const handleSelectHistory = (item: SavedPresentation) => {
    setCurrentTitle(item.title);
    setCurrentHtml(item.html);
    setCurrentSlideCount(item.slideCount);
    showToast(`📂 "${item.title}" 프레젠테이션을 불러왔습니다.`);
  };

  // 히스토리 삭제
  const handleDeleteHistory = (id: string) => {
    const updated = deletePresentation(id);
    setHistoryItems(updated);
    showToast('🗑️ 슬라이드가 보관함에서 삭제되었습니다.');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
      }}
    >
      {/* Top Header */}
      <Header
        onOpenHistory={() => setIsHistoryOpen(true)}
        onLoadSample={handleLoadSample}
        onNewPresentation={handleNewPresentation}
        historyCount={historyItems.length}
      />

      {/* Main Studio Grid */}
      <main
        style={{
          flex: 1,
          padding: '24px 28px',
          display: 'grid',
          gridTemplateColumns: '460px 1fr',
          gap: '24px',
          height: 'calc(100vh - 70px)',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {/* Left Column: Input Studio */}
        <PromptInputPanel
          onGenerate={handleGenerate}
          isLoading={isLoading}
          loadingStep={loadingStep}
        />

        {/* Right Column: 16:9 Presentation Stage & Actions */}
        <SlideViewer
          title={currentTitle}
          slideCount={currentSlideCount}
          html={currentHtml}
          onOpenEditor={() => setIsEditorOpen(true)}
        />
      </main>

      {/* Code Editor Modal */}
      <CodeEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        initialCode={currentHtml}
        onApplyCode={handleApplyUpdatedCode}
      />

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        items={historyItems}
        onSelect={handleSelectHistory}
        onDelete={handleDeleteHistory}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#1e293b',
            color: '#f8fafc',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '10px',
            padding: '12px 20px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
            zIndex: 2000,
            fontSize: '0.9rem',
            fontWeight: 500,
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {toastMessage}
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
