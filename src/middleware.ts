// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const url = req.nextUrl.clone();

  // Mapeo agnóstico de subdominios a Slugs del Registro
  const tenantMap: Record<string, string> = {
    'ard.via51.org': 'holding-ard',
    'pol.via51.org': 'politica-general',
    'fj.via51.org': 'inmobiliaria-fj',
    'localhost:3000': 'holding-ard' // Para desarrollo
  };

  const tenantSlug = tenantMap[host] || 'default';

  // Inyectamos el slug en un header para que el Frontend o la API lo usen sin recalcular
  const response = NextResponse.next();
  response.headers.set('x-tenant-slug', tenantSlug);

  // Lógica de redirección para Holding preservada pero limpia
  if (host.includes('ard.via51.org') && url.pathname === '/') {
    url.pathname = '/holdings/ard';
    return NextResponse.rewrite(url);
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};