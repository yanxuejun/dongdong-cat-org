import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 如果访问的是根路径 /，自动重定向到 /zh
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/zh', request.url));
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