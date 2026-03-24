import { NextResponse } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host');
  const url = request.nextUrl.clone();

  // 1. EL TRÁFICO MAESTRO: via51.org -> Campaña Electoral
  if (host === 'via51.org' || host === 'www.via51.org' || host === 'pol.via51.org') {
    // Redirigimos internamente a la carpeta de la campaña
    url.pathname = '/eje-politico/campana-2026'; 
    return NextResponse.rewrite(url);
  }

  // 2. PACHA: Comando Central
  if (host === 'pacha.via51.org') {
    url.pathname = '/admin/pacha';
    return NextResponse.rewrite(url);
  }

  // 3. EJE PRODUCTIVO: Inmobiliaria
  if (host === 'fj.via51.org') {
    url.pathname = '/eje-productivo/inmobiliaria';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}