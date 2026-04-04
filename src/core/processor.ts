// src/core/processor.ts
import { logEvent } from '../lib/audit-logger';

export interface TransitionRequest {
    entity_id: string;
    current_status: string;
    target_status: string;
    actor_id: string;
    tenant_id: string;
}

export class CoreProcessor {
    /**
     * AGNOSTIC STATE MACHINE
     * Executes transitions based on registry rules without knowing domain specifics.
     */
    public static async executeTransition(
        request: TransitionRequest,
        allowedTransitions: string[] // Passed from the Domain Registry
    ): Promise<{ success: boolean; message: string }> {

        const transitionKey = `${request.current_status} -> ${request.target_status}`;

        // 1. Logic Validation
        if (!allowedTransitions.includes(transitionKey)) {
            // LOG FAILURE (Immutable Audit)
            await logEvent({
                actor_id: request.actor_id,
                action_type: 'INVALID_TRANSITION_ATTEMPT',
                payload_snapshot: { request, error: 'Transition not allowed' },
                tenant_id: request.tenant_id,
                status: 'FAILURE'
            });

            return { success: false, message: `Transition ${transitionKey} is not valid for this domain.` };
        }

        // 2. State Execution Simulation
        // Here we would perform the actual DB update (e.g., UPDATE entities SET status = target_status)
        const success = true;

        // 3. LOG SUCCESS (Immutable Audit)
        if (success) {
            await logEvent({
                actor_id: request.actor_id,
                action_type: 'STATE_TRANSITION',
                payload_snapshot: {
                    entity_id: request.entity_id,
                    transition: transitionKey,
                    timestamp: new Date().toISOString()
                },
                tenant_id: request.tenant_id,
                status: 'SUCCESS'
            });
        }

        return {
            success: true,
            message: `Entity ${request.entity_id} moved to ${request.target_status}`
        };
    }
}