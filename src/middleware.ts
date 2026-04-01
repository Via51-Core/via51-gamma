/**
 * PATH: /middleware.ts
 * ROLE: Nivel 1 - BETA (Control de Tráfico y Contexto)
 * DESC: Intercepta peticiones para inyectar el Tenant Slug en la sesión de DB.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // 1. Extraer subdominio (Slug del Tenant)
  const hostname = req.headers.get('host');
  const slug = hostname?.split('.')[0];

  if (!slug || slug === 'www' || slug === 'via51') {
    // Redirigir a la fachada principal si no hay subdominio ALFA
    return res;
  }

  // 2. Establecer el contexto del Tenant en la sesión de Postgres
  // Esto activa las políticas RLS configuradas previamente
  await supabase.rpc('set_app_context', { 
    tenant_slug: slug 
  });

  // 3. Inyectar el slug en las cabeceras para consumo del Frontend
  res.headers.set('x-v51-tenant-slug', slug);

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};