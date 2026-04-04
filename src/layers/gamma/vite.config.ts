import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@alfa': path.resolve(__dirname, './src/layers/alfa'),
            '@beta': path.resolve(__dirname, './src/layers/beta'),
            '@gamma': path.resolve(__dirname, './src/layers/gamma'),
            '@ui': path.resolve(__dirname, './src/layers/ui'),
        },
    },
});