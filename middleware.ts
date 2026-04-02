/**
 * FUNCIÓN: Middleware de Soberanía de Acceso
 * LUGAR: /middleware.ts
 * FECHA: 02-Abr-2026 | 17:45
 * DESCRIPCIÓN: Control de flujo para subdominios Nodo GAMMA y Nodo BETA.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') || '';

  // Lógica de redirección o validación por Nodo
  if (hostname.includes('gamma.')) {
    // Espacio para validación de privilegios de Administrador
    console.log("[GUARD]: Acceso a Nodo GAMMA detectado.");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};