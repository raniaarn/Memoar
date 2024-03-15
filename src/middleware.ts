import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isCookiesExist = !!request.cookies.get("user_token")
  const isLoginPage = pathname.startsWith('/login');
  const isRegisterPage = pathname.startsWith('/register');
  const isHomePage = pathname === '/';

  if (!isCookiesExist && !(isLoginPage || isHomePage || isRegisterPage)) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (isCookiesExist && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|icons|favicon.ico).*)']
}