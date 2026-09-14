import { NextRequest, NextResponse } from 'next/server';
import { callGeminiSlideModel } from '@/lib/gemini';
import {
  buildSlideSystemInstruction,
  extractHtmlFromGeminiResponse,
} from '@/lib/slide-prompt';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      prompt,
      slideCount = 5,
      topic = '',
      includeChart = true,
      audience = '일반 청중',
      theme = 'dark',
    } = body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 5) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: '슬라이드 기획안 내용을 최소 5자 이상 입력해 주세요.',
          },
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_API_KEY',
            message:
              '서버에 GEMINI_API_KEY 환경변수가 설정되지 않았습니다. .env 파일을 확인해 주세요.',
          },
        },
        { status: 500 }
      );
    }

    const validSlideCount = Math.max(3, Math.min(Number(slideCount) || 5, 10));

    // web-slide-creator 스킬을 100% 반영한 시스템 프롬프트 구축
    const systemInstruction = buildSlideSystemInstruction({
      prompt,
      slideCount: validSlideCount,
      topic,
      includeChart: Boolean(includeChart),
      audience,
      theme,
    });

    const userPromptContent = `[발표 주제/제목]: ${topic || '미지정'}\n[요구 슬라이드 수]: ${validSlideCount}장\n[차트 포함 여부]: ${includeChart ? '포함' : '미포함'}\n[청중 대상]: ${audience}\n[기획 상세 내용]:\n${prompt}`;

    // gemini-2.5-flash-lite (및 최신 권장 Flash Lite) 호출
    const { text: rawResponseText, model: usedModel } = await callGeminiSlideModel(
      systemInstruction,
      userPromptContent,
      apiKey
    );

    // HTML 추출
    const html = extractHtmlFromGeminiResponse(rawResponseText);

    // 제목 추출 (HTML title 태그 또는 topic 또는 첫 줄)
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const resolvedTitle =
      titleMatch && titleMatch[1]
        ? titleMatch[1].trim()
        : topic || 'Gemini Presentation';

    return NextResponse.json({
      success: true,
      data: {
        title: resolvedTitle,
        slideCount: validSlideCount,
        html,
        model: usedModel,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('슬라이드 생성 중 오류 발생:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'GENERATION_FAILED',
          message: error.message || '슬라이드 생성 중 알 수 없는 오류가 발생했습니다.',
        },
      },
      { status: 500 }
    );
  }
}
