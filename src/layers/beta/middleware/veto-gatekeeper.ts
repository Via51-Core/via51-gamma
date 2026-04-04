// src/middleware/veto-gatekeeper.ts

const SUPEROWNER_ID = "fredy-0000-0000-gamma-super"; // Placeholder UUID for Fredy
const VETO_SECRET_TOKEN = process.env.VETO_CLEARANCE_TOKEN; // Set in Gamma environment

interface RequestContext {
    userId: string;
    action: string;
    vetoToken?: string;
}

/**
 * THE FREDY GATEKEEPER
 * Prevents creation of new Owners (Level 2 expansion) without explicit SuperOwner clearance.
 */
export const vetoGatekeeper = (context: RequestContext) => {
    const { userId, action, vetoToken } = context;

    // 1. Vitalicio Rule: Fredy bypasses all restrictions
    if (userId === SUPEROWNER_ID) {
        console.log("[GAMMA] SuperOwner access granted. Veto bypassed.");
        return true;
    }

    // 2. Expansion Rule: Creating an OWNER requires Level 2 Veto Clearance
    if (action === "CREATE_OWNER") {
        if (!vetoToken || vetoToken !== VETO_SECRET_TOKEN) {
            throw new Error("403 Forbidden: Veto Power active. Only Fredy can authorize new Owners.");
        }
    }

    // 3. Hierarchy Check: Standard flow for Beta/Alfa
    console.log(`[BETA] Traffic processing authorized for user: ${userId}`);
    return true;
};