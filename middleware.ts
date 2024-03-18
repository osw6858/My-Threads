import { NextRequest, NextResponse } from 'next/server';
import { END_POINT } from './app/_constant/endPoint';

// TODO: 로그인 및 로그아웃 여부에 따라 접근하지 못하는 페이지를 추가로 지정
const logedOutRoute = [
  END_POINT.MAIN,
  END_POINT.SEARCH,
  END_POINT.USER,
  END_POINT.COMMENT,
  END_POINT.ACTIVITY,
];
const logedInRoute = [END_POINT.ROOT, END_POINT.SIGN_UP];

export function middleware(request: NextRequest) {
  const { cookies } = request;
  const hasCookie = cookies.has('my-access-token');
  if (!hasCookie && logedOutRoute.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(
      new URL(END_POINT.ROOT, request.nextUrl.origin),
    );
  }
  if (hasCookie && logedInRoute.includes(request.nextUrl.pathname)) {
    return NextResponse.rewrite(
      new URL(END_POINT.MAIN, request.nextUrl.origin),
    );
  }
  return NextResponse.next();
}
