// src/lib/audit-logger.ts
import { createClient } from '@supabase/supabase-js'; // Assuming Supabase usage

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export interface AuditEntry {
    actor_id: string;        // WHO (User UUID)
    action_type: string;     // WHAT (e.g., STATE_TRANSITION)
    payload_snapshot: any;   // DATA (The state before/after)
    tenant_id: string;       // WHERE (The fractal node ID)
    status: 'SUCCESS' | 'FAILURE';
}

/**
 * IMMUTABLE LOGGING
 * Writes directly to sys_events. Level 2 (Gamma) oversight.
 */
export const logEvent = async (entry: AuditEntry) => {
    const event = {
        ...entry,
        timestamp: new Date().toISOString(),
    };

    const { error } = await supabase
        .from('sys_events')
        .insert([event]);

    if (error) {
        // Critical failure: If audit fails, we must alert the SuperOwner (Fredy)
        console.error(`[CRITICAL - GAMMA] Audit Logging Failed: ${error.message}`);
        // In a real scenario, this would trigger an emergency notification
    }

    return event;
};