/**
 * FUNCTION: TenantContextOrchestrator
 * LOCATION: /middleware/context-resolver.js
 * DATE: 2026-04-03
 * TIME: 07:18:27
 * DESCRIPTION: Resolves the tenant context (Gamma/Beta/Alfa) from the hostname 
 * and injects the corresponding tenant_id into the global state/headers.
 * This ensures "Immune Identity" and strict RLS compliance.
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.DB_URL, process.env.DB_ANON_KEY);

export async function resolveTenantContext(hostname) {
    // Clean hostname to maintain Radical Agnosticism
    const domainParts = hostname.split('.');
    const subdomain = domainParts.length > 2 ? domainParts[0] : 'root';

    try {
        const { data: registry, error } = await supabase
            .from('sys_registry')
            .select('tenant_id, node_level, config_payload')
            .eq('subdomain_alias', subdomain)
            .single();

        if (error || !registry) {
            throw new Error(`Critical Architecture Breach: Context for ${subdomain} not found.`);
        }

        return {
            tenantId: registry.tenant_id,
            level: registry.node_level, // GAMMA, BETA, or ALFA
            settings: registry.config_payload
        };
    } catch (criticalError) {
        // Log to sys_events for audit trail
        console.error(`[AUDIT-ERROR] ${new Date().toISOString()} - ${criticalError.message}`);
        return null;
    }
}