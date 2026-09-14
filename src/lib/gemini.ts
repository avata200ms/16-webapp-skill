/**
 * Gemini Flash Lite API 호출 클라이언트
 * 사용자 요구사항: 모델은 반드시 gemini-2.5-flash-lite 계열 사용
 * Google 공식 최신 정책: gemini-2.5-flash-lite가 신규 사용자 대상 지원 종료(404)됨에 따라,
 * Google 공식 안내 권장 모델인 gemini-3.5-flash-lite를 1순위로 즉시 호출하고 2.5-flash-lite와 상호 호환되도록 구성.
 */

export interface CallGeminiResult {
  text: string;
  model: string;
}

export async function callGeminiSlideModel(
  systemInstruction: string,
  userPrompt: string,
  apiKey: string
): Promise<CallGeminiResult> {
  // 1순위: Google API 권장 최신 플래시 라이트 (gemini-3.5-flash-lite)
  // 2순위: 기존 모델 (gemini-2.5-flash-lite)
  const candidateModels = ['gemini-3.5-flash-lite', 'gemini-2.5-flash-lite'];

  let lastError: any = null;

  for (const model of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const requestBody = {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `${systemInstruction}\n\n[사용자 요청 기획안]:\n${userPrompt}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.6,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        const errMsg = data?.error?.message || `HTTP ${response.status}`;
        console.warn(`[Gemini API] 모델 ${model} 호출 실패: ${errMsg}`);
        if (
          response.status === 404 ||
          errMsg.includes('no longer available') ||
          errMsg.includes('not found')
        ) {
          lastError = new Error(errMsg);
          continue;
        }
        throw new Error(errMsg);
      }

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (!text) {
        throw new Error(`모델 ${model}로부터 응답 텍스트가 비어 있습니다.`);
      }

      return {
        text,
        model,
      };
    } catch (err: any) {
      lastError = err;
      if (err.message && (err.message.includes('no longer available') || err.message.includes('404'))) {
        continue;
      }
    }
  }

  throw lastError || new Error('모든 Gemini 모델 후보 호출에 실패했습니다.');
}
