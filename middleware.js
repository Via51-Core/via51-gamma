import { NextResponse } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host');
  const url = request.nextUrl.clone();

  // 1. LA COCINA Y LA MESA (via51.org y pol.via51.org)
  // Ambos dominios piden la data cocinada en el slug 'pol'
  if (host === 'via51.org' || host === 'www.via51.org' || host === 'pol.via51.org') {
    url.pathname = '/';
    url.searchParams.set('slug', 'pol');
    return NextResponse.rewrite(url);
  }

  // 2. PACHA (Comando Central)
  if (host.includes('pacha')) {
    url.pathname = '/admin/pacha';
    return NextResponse.rewrite(url);
  }

  // 3. EJE PRODUCTIVO (fj.via51.org)
  if (host.includes('fj.')) {
    url.pathname = '/';
    url.searchParams.set('slug', 'fj');
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};