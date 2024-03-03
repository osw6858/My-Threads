import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { cookies } = request;
  const hasCookie = cookies.has('my-access-token');
  if (!hasCookie && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  }
  if (hasCookie && request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/success', request.nextUrl.origin));
  }
  return NextResponse.next();
}

// TODO: matcher는 일단 모든 경로로 설정함 추후에 세세하게 커스텀이 필요함
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
