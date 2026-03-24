import { NextResponse } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host');
  const url = request.nextUrl.clone();

  // 1. EJE POLÍTICO (via51.org y pol.via51.org)
  if (host.includes('pol.via51.org') || host === 'via51.org') {
    // Si no tienes una carpeta específica, envíalo a la raíz
    // Pero si quieres que cargue la data de 'pol', forzamos el parámetro
    url.pathname = '/'; 
    url.searchParams.set('slug', 'pol');
    return NextResponse.rewrite(url);
  }

  // 2. PACHA (pacha.via51.org)
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