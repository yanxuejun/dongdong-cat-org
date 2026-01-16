import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    // 关键修复：将 process.env 强行断言为 any，以调用 KV 的方法
    const KV = (process.env as any).VISITOR_KV;

    if (!KV || typeof KV.get !== 'function') {
      console.error("KV Binding is missing or not configured correctly.");
      // 如果 KV 没绑定好，返回一个保底数字，确保页面不崩溃
      return NextResponse.json({ id: 888 });
    }

    // 从 KV 中读取 'count'
    const current = await KV.get('count') || '0';
    const next = parseInt(current) + 1;

    // 更新 KV
    await KV.put('count', next.toString());

    return NextResponse.json({ id: next });
  } catch (e) {
    console.error("KV Error:", e);
    return NextResponse.json({ id: 999 });
  }
}