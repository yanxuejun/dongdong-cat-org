import { NextResponse } from 'next/server';
export const runtime = 'edge';

export async function GET() {
  try {
    // @ts-ignore VISITOR_KV 是在 CF 后台绑定的变量
    const KV = process.env.VISITOR_KV;
    const current = await KV.get('count') || '0';
    const next = parseInt(current) + 1;
    await KV.put('count', next.toString());
    return NextResponse.json({ id: next });
  } catch {
    return NextResponse.json({ id: 888 });
  }
}