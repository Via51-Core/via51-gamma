// src/app/api/v1/engine/route.ts
import { NextResponse } from 'next/server';
import { vetoGatekeeper } from '@/middleware/veto-gatekeeper';
import { CoreValidator } from '@/core/validator';
import { CoreProcessor } from '@/core/processor';
import { logEvent } from '@/lib/audit-logger';

// Standardized Response Codes
const STATUS_CODES = {
    SUCCESS: 200,
    VETO_TRIGGERED: 403,
    VALIDATION_FAILED: 400,
    CORE_ERROR: 500
};

export async function POST(request: Request) {
    const body = await request.json();
    const { domain_id, action, payload, actor_id, tenant_id, vetoToken } = body;

    try {
        // STEP 1: THE VETO (Gamma Level Check)
        // Only Fredy or authorized tokens can perform Level 2 operations.
        vetoGatekeeper({ userId: actor_id, action, vetoToken });

        // STEP 2: THE SCHEMA (Loading the Registry)
        // Dynamic import based on domain_id (No hardcoding)
        let schema;
        try {
            schema = await import(`@/registry/domains/${domain_id}.json`);
        } catch (e) {
            throw new Error(`Registry Error: Domain '${domain_id}' not found.`);
        }

        // STEP 3: THE VALIDATOR (Beta Level)
        const validation = CoreValidator.validate(payload, schema);
        if (!validation.isValid) {
            await logEvent({
                actor_id,
                action_type: 'VALIDATION_FAILED',
                payload_snapshot: { domain_id, errors: validation.errors },
                tenant_id,
                status: 'FAILURE'
            });

            return NextResponse.json(
                { error: 'Validation Failed', details: validation.errors },
                { status: STATUS_CODES.VALIDATION_FAILED }
            );
        }

        // STEP 4: THE PROCESSOR (Execution Layer)
        // Executes transition based on registry's allowedTransitions
        const result = await CoreProcessor.executeTransition(
            {
                entity_id: payload.id || 'new_entity',
                current_status: payload.status || 'draft',
                target_status: payload.target_status,
                actor_id,
                tenant_id
            },
            schema.transitions
        );

        if (!result.success) {
            return NextResponse.json(
                { error: 'Processor Error', message: result.message },
                { status: STATUS_CODES.CORE_ERROR }
            );
        }

        // STEP 5: FINAL SUCCESS
        return NextResponse.json(
            {
                status: 'CORE_SUCCESS',
                message: `Agnostic process completed for domain: ${domain_id}`,
                data: result
            },
            { status: STATUS_CODES.SUCCESS }
        );

    } catch (error: any) {
        // HANDLE VETO OR SYSTEM CRASHES
        const isVeto = error.message.includes('403 Forbidden');

        // Log the crash/veto in Gamma
        await logEvent({
            actor_id: actor_id || 'UNKNOWN',
            action_type: 'ENGINE_EXCEPTION',
            payload_snapshot: { error: error.message },
            tenant_id: tenant_id || 'CORE',
            status: 'FAILURE'
        });

        return NextResponse.json(
            { error: isVeto ? 'Veto Triggered' : 'Internal Engine Error', message: error.message },
            { status: isVeto ? STATUS_CODES.VETO_TRIGGERED : STATUS_CODES.CORE_ERROR }
        );
    }
}