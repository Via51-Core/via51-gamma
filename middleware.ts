// path: /middleware.ts
// description: Multi-tenant routing engine for VÍA51 ecosystem.

import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Define allowed domains for VÍA51
  const rootDomain = 'via51.org';
  
  // Extract subdomain (e.g., pol.via51.org -> pol)
  const currentHost = hostname
    .replace(`.localhost:3000`, '') // Development
    .replace(`.${rootDomain}`, '');

  // Case 1: Root Hub (via51.org)
  if (hostname === rootDomain || hostname === 'localhost:3000') {
    return NextResponse.rewrite(new URL(`/home${url.pathname}`, req.url));
  }

  // Case 2: Fractal Nodes (Alfa/Beta/Gamma)
  // Rewrites the request to /_sites/[site] which will handle the logic
  return NextResponse.rewrite(new URL(`/_sites/${currentHost}${url.pathname}`, req.url));
}