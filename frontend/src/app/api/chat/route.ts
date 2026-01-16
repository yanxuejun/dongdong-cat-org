import { NextResponse } from 'next/server';
export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'zh';

  try {
    const AI = (process.env as any).AI;
    const prompt = lang === 'zh'
      ? "你是一只名叫冬冬(DongDong)的傲娇英短猫。用中文回复一句话，要可爱。"
      : "You are a cat named DongDong. Reply in one short English sentence, be cute and bossy.";

    const response = await AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: '抚摸' }
      ]
    });
    return NextResponse.json({ message: response.response });
  } catch {
    return NextResponse.json({ message: lang === 'zh' ? "喵～" : "Meow~" });
  }
}