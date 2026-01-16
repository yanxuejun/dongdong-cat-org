import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    // 获取环境变量并强行断言为 any 类型，以调用 .run 方法
    const AI = (process.env as any).AI;

    if (!AI || typeof AI.run !== 'function') {
      console.error("AI Binding is missing or not configured correctly.");
      return NextResponse.json({ message: "喵？（东东现在不想理你）" });
    }

    const response = await AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { 
          role: 'system', 
          content: '你是一只名叫东东(DongDong)的傲娇猫。你的回复要短小精悍，带一点幽默和不屑。' 
        },
        { 
          role: 'user', 
          content: '有人摸了摸你的头。' 
        }
      ]
    });

    return NextResponse.json({ message: response.response });
  } catch (e) {
    console.error("AI Error:", e);
    return NextResponse.json({ message: "喵呜...（东东睡着了）" });
  }
}