// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const url = req.nextUrl.clone();

  // Si entran a ard.via51.org, los mandamos internamente a /holdings/ard
  if (host.includes('ard.via51.org')) {
    if (url.pathname === '/') {
      url.pathname = '/holdings/ard';
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};