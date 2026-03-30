/**
 * ARCHIVO: src/kernel/security/identities.ts
 * NIVEL: ARD (Kernel)
 * DESCRIPCIÓN: Definición de la Clase Propietaria Inmutable.
 * PACTO AGNÓSTICO: Blindaje contra "Golpes de Estado".
 */

export const KERNEL_OWNERS = {
  ALFA: {
    email: "tu-correo-google@gmail.com", // Tu correo (Propietario Principal)
    role: "OWNER_ALFA",
    power_level: 100
  },
  BETA: {
    email: "renzo.bazalar@gmail.com", // Renzo Bazalar
    phone: "+51922172402",
    dni: "48117809",
    role: "OWNER_BETA",
    power_level: 100
  }
};

/**
 * LÓGICA DE BLINDAJE INMUTABLE
 * Esta función impide que un propietario degrade o elimine al otro.
 */
export const validateAction = (actorEmail: string, targetEmail: string, actionType: string): boolean => {
  const isOwnerAlfa = actorEmail === KERNEL_OWNERS.ALFA.email;
  const isOwnerBeta = actorEmail === KERNEL_OWNERS.BETA.email;
  
  const targetIsOwner = targetEmail === KERNEL_OWNERS.ALFA.email || targetEmail === KERNEL_OWNERS.BETA.email;

  // REGLA DE ORO: Si la acción es contra un Propietario...
  if (targetIsOwner) {
    if (actionType === 'DELETE' || actionType === 'DOWNGRADE_ROLE') {
      // Bloqueo absoluto de "Golpe de Estado"
      console.warn(`INTENTO DE GOLPE DETECTADO: ${actorEmail} intentó ${actionType} a un Propietario.`);
      return false; 
    }
  }

  // Los propietarios tienen permisos totales sobre el resto del sistema (Pacha/Alfa)
  return isOwnerAlfa || isOwnerBeta;
};