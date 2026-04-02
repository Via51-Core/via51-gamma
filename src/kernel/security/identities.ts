/**
 * PATH: /v51-ecosystem/via51-gamma/src/kernel/security/identities.ts
 */

export const V51_CORE_TABLES = [
  'v51_registry',
  'v51_nodes_status'
];

export const ROOT_IMMUNE_ID = "9157ae13-36ac-4259-9680-1d9bd2cada4a"; // Fredy

export const isImmune = (uid: string) => uid === ROOT_IMMUNE_ID;
