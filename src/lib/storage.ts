/**
 * LocalStorage 기반 프레젠테이션 히스토리 관리 유틸리티
 */

export interface SavedPresentation {
  id: string;
  title: string;
  prompt: string;
  slideCount: number;
  includeChart: boolean;
  html: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'gemini_slide_studio_history_v1';

export function getSavedPresentations(): SavedPresentation[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read from localStorage', e);
    return [];
  }
}

export function savePresentation(
  presentation: Omit<SavedPresentation, 'id' | 'createdAt' | 'updatedAt'> & {
    id?: string;
  }
): SavedPresentation {
  if (typeof window === 'undefined') {
    return {
      ...presentation,
      id: presentation.id || 'temp',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  const existing = getSavedPresentations();
  const now = new Date().toISOString();
  const id = presentation.id || 'deck_' + Date.now();

  const record: SavedPresentation = {
    id,
    title: presentation.title,
    prompt: presentation.prompt,
    slideCount: presentation.slideCount,
    includeChart: presentation.includeChart,
    html: presentation.html,
    createdAt: now,
    updatedAt: now,
  };

  // 기존 항목이 있으면 업데이트, 없으면 맨 앞에 추가
  const index = existing.findIndex((item) => item.id === id);
  let updatedList: SavedPresentation[];

  if (index >= 0) {
    record.createdAt = existing[index].createdAt;
    updatedList = [...existing];
    updatedList[index] = record;
  } else {
    // 최대 20개 보관
    updatedList = [record, ...existing].slice(0, 20);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }

  return record;
}

export function deletePresentation(id: string): SavedPresentation[] {
  if (typeof window === 'undefined') return [];
  const existing = getSavedPresentations();
  const filtered = existing.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to delete from localStorage', e);
  }
  return filtered;
}
