import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 根路径和语言路径重定向到 scrollytelling 体验页
  if (pathname === '/' || pathname === '/zh' || pathname === '/en') {
    return NextResponse.redirect(new URL('/scrollytelling', request.url));
  }

  return NextResponse.next();
}

// 匹配规则：排除 api 接口、静态资源文件等
export const config = {
  matcher: [
    /*
     * 匹配所有路径，除了：
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /static, /favicon.ico, 等静态文件 (后缀名匹配)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};