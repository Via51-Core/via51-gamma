import React from 'react';
import * as LucideIcons from 'lucide-react';

interface DynamicIconProps {
  iconName: string; 
  size?: number;
  className?: string;
}

/**
 * GENERADOR DE ICONOGRAFÍA AGNÓSTICA
 * Cumple el protocolo de identidad: El código no conoce el icono, 
 * solo resuelve el recurso que la tabla [sys_registry] le asigna al nodo.
 */
export const DynamicIcon: React.FC<DynamicIconProps> = ({ 
  iconName, 
  size = 24, 
  className = "" 
}) => {
  // Mapeo dinámico seguro de la librería Lucide
  const IconComponent = (LucideIcons as any)[iconName] as React.ElementType;

  if (!IconComponent) {
    // Icono de respaldo (Fallback) para mantener la integridad visual si el slug no tiene icono definido
    return <LucideIcons.HelpCircle size={size} className={className} />;
  }

  return <IconComponent size={size} className={className} />;
};