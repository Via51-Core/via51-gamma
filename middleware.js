import { NextResponse } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host');
  const url = request.nextUrl.clone();

  // Caso A: EJE POLÍTICO (via51.org o pol.via51.org)
  if (host === 'via51.org' || host === 'www.via51.org' || host === 'pol.via51.org') {
    url.pathname = '/'; // Se queda en la raíz
    url.searchParams.set('slug', 'pol'); // Le dice al código: "Carga a Mesías Guevara"
    return NextResponse.rewrite(url);
  }

  // Caso B: PACHA (pacha.via51.org)
  if (host.includes('pacha')) {
    url.pathname = '/admin/pacha';
    return NextResponse.rewrite(url);
  }

  // Caso C: EJE PRODUCTIVO (fj.via51.org)
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