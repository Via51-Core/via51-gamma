/**
 * FUNCIÓN: Webhook de Notificación en Tiempo Real (Edge Function)
 * LUGAR: /supabase/functions/notify-gamma/index.js
 * FECHA: 02-Abr-2026 | 16:15
 * DESCRIPCIÓN: Dispara una alerta HTTP cuando se inserta un registro en 'sys_interactions'.
 */

import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-client@2"

serve(async (req) => {
    const { record } = await req.json()

    // Solo notificar si es una nueva interacción entrante (pending)
    if (record.status === 'pending') {
        const payload = {
            title: "NUEVA INTERACCIÓN: NODO BETA",
            body: `Emisor: ${record.sender_name}\nContenido: ${record.content.substring(0, 50)}...`,
            url: "https://gamma.via51.org", // Acceso directo al Nodo de Control
        }

        // Aquí se integra con el servicio de mensajería (Push/Telegram/Email)
        // Ejemplo: Envío vía fetch a servicio de mensajería del Owner
        console.log(`[ALERTA OPERACIÓN 12-A] Notificando al Owner sobre: ${record.id}`);
    }

    return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } })
})