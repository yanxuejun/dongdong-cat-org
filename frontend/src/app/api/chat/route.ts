import { NextResponse } from 'next/server';
export const runtime = 'edge';

export async function GET() {
  try {
    // @ts-ignore AI 是 CF Workers AI 绑定
    const AI = process.env.AI;
    const response = await AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { role: 'system', content: '你是东东(DongDong)，一只住在dongdongcat.org的傲娇英短猫。用一句话回复人类的抚摸，要简短、毒舌但可爱。回复语言必须根据环境切换（中文或英文）。' },
        { role: 'user', content: '抚摸' }
      ]
    });
    return NextResponse.json({ message: response.response });
  } catch {
    return NextResponse.json({ message: "喵？（东东不想理你）" });
  }
}