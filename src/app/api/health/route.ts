import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;
  const isConfigured = Boolean(apiKey && apiKey.length > 5);

  let maskedKey = '';
  if (isConfigured && apiKey) {
    maskedKey = apiKey.slice(0, 4) + '...' + apiKey.slice(-4);
  }

  return NextResponse.json({
    status: 'ok',
    model: 'gemini-2.5-flash-lite',
    apiKeyConfigured: isConfigured,
    apiKeyMasked: maskedKey,
    timestamp: new Date().toISOString(),
  });
}
