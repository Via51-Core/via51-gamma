import { NextResponse } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host');
  const url = request.nextUrl.clone();

  // 1. LA ORDEN: Si entran por via51.org, se les sirve el contenido de POL
  if (host === 'via51.org' || host === 'www.via51.org') {
    url.pathname = '/';
    url.searchParams.set('slug', 'pol'); 
    return NextResponse.rewrite(url);
  }

  // 2. LA FUENTE: pol.via51.org siempre sirve 'pol'
  if (host === 'pol.via51.org') {
    url.pathname = '/';
    url.searchParams.set('slug', 'pol');
    return NextResponse.rewrite(url);
  }

  // Otros nodos (FJ y PACHA)
  if (host.includes('fj.')) {
    url.pathname = '/';
    url.searchParams.set('slug', 'fj');
    return NextResponse.rewrite(url);
  }
  
  if (host.includes('pacha')) {
    url.pathname = '/admin/pacha';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};