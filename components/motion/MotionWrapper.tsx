/**
 * FUNCIÓN: MotionWrapper (Componente de Animación)
 * LUGAR: /components/motion/MotionWrapper.tsx
 * FECHA: 02-Abr-2026 | 17:48
 */

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
    children: ReactNode;
    delay?: number;
}

export const FadeIn: React.FC<Props> = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
    >
        {children}
    </motion.div>
);