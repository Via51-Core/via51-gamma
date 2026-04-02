/**
 * PATH: /middleware.ts
 * ROLE: Nivel 1 - GAMMA (Soberanía de Acceso)
 * DESC: Muro de contención perimetral. Solo el UID Maestro cruza a Gamma.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

// CONSTANTE DE INMUNIDAD (FREDY)
const MASTER_UID = "9157ae13-36ac-4259-9680-1d9bd2cada4a";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // 1. Identificación de Territorio (Slug)
  const hostname = req.headers.get('host');
  const slug = hostname?.split('.')[0];

  // 2. Gestión de Sesión
  const { data: { session } } = await supabase.auth.getSession();

  // 3. PROTOCOLO DE EXCLUSIVIDAD GAMMA
  // Si el territorio es 'gamma', aplicamos el filtro de identidad inmutable
  if (slug === 'gamma') {
    if (!session || session.user.id !== MASTER_UID) {
      console.warn(`V51_SECURITY: Intento de acceso no autorizado a GAMMA por UID: ${session?.user.id || 'ANÓNIMO'}`);
      // Eyección inmediata al dominio raíz o login
      return NextResponse.redirect(new URL('https://via51.org', req.url));
    }
  }

  // 4. Inyección de Contexto para el resto de niveles (Beta/Alfa)
  if (slug && slug !== 'www' && slug !== 'via51') {
    res.headers.set('x-v51-tenant-slug', slug);

    // Opcional: Solo si mantendrás la función RPC en tu DB
    await supabase.rpc('set_app_context', {
      tenant_slug: slug
    });
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
};