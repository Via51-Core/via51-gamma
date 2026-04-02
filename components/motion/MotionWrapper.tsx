/**
 * FUNCIÓN: Animaciones de Interfaz (Efecto App Nativa)
 * LUGAR: /components/motion/MotionWrapper.jsx
 * FECHA: 02-Abr-2026 | 16:30
 * DESCRIPCIÓN: Envoltura de alta fidelidad para transiciones de componentes.
 */

import { motion } from 'framer-motion';

export const PageTransition = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
        {children}
    </motion.div>
);

export const ItemStagger = ({ children, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
            delay: index * 0.05,
            duration: 0.3,
            ease: "easeOut"
        }}
    >
        {children}
    </motion.div>
);