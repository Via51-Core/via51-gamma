import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host');

  // Definimos los slugs basados en el subdominio
  const tenants = {
    'pol.via51.org': 'campana-presidencial',
    'fj.via51.org': 'inmobiliaria-servicios',
    'makilovers.via51.org': 'restaurante-maki',
  };

  const tenantSlug = tenants[hostname] || 'default';

  // Reescribimos la ruta internamente para que el motor sepa a quién servir
  url.pathname = `/_tenant/${tenantSlug}${url.pathname}`;
  
  return NextResponse.rewrite(url);
}