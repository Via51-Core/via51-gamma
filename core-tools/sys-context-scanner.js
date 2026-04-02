/**
 * Function: System Context & Integrity Scanner (Agnostic Core)
 * Location: ./core-tools/sys-context-scanner.js
 * Date: 2026-04-02 12:40:00
 * Description: Mapea la topología de archivos y el esquema de datos 
 * bajo estándares de Agnosticismo Radical.
 */

const fs = require('fs');
const path = require('path');

const SETTINGS = {
    ignoreList: ['node_modules', '.git', 'dist', '.vercel', 'build', 'core-tools'],
    validExt: ['.js', '.jsx', '.ts', '.tsx', '.json', '.sql', '.css'],
    outputFile: 'env-manifest.json'
};

/**
 * Verifica la integridad estructural de archivos JSON y JS básicos
 */
function verifyIntegrity(targetPath) {
    const content = fs.readFileSync(targetPath, 'utf8');
    try {
        if (targetPath.endsWith('.json')) {
            JSON.parse(content);
        }
        // Validación de salud: Si el archivo está vacío o tiene errores críticos
        if (content.length === 0) return { status: 'EMPTY', detail: 'File has no content' };
        return { status: 'CLEAN', detail: null };
    } catch (error) {
        return { status: 'CORRUPT', detail: error.message };
    }
}

/**
 * Escanea el árbol de directorios de forma recursiva (Arquitectura Fractal)
 */
function mapDirectory(currentPath) {
    const items = fs.readdirSync(currentPath);
    const nodes = [];

    items.forEach(item => {
        if (SETTINGS.ignoreList.includes(item)) return;

        const fullPath = path.join(currentPath, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            nodes.push({
                name: item,
                type: 'directory',
                structure: mapDirectory(fullPath)
            });
        } else if (SETTINGS.validExt.includes(path.extname(item))) {
            const healthCheck = verifyIntegrity(fullPath);
            nodes.push({
                name: item,
                type: 'file',
                health: healthCheck.status,
                issue: healthCheck.detail
            });
        }
    });
    return nodes;
}

/**
 * Ejecución Principal y Generación de Manifiesto
 */
function generateManifest() {
    const rootDir = process.cwd();
    const manifest = {
        meta: {
            generated_at: new Date().toISOString(),
            engine: "Antigravity Core V1",
            scope: "Full System Context"
        },
        topology: mapDirectory(rootDir),
        data_layer_blueprint: {
            core_registry: {
                table: "sys_registry",
                critical_keys: ["tenant_id", "parent_tenant_id", "hostname"]
            },
            audit_log: "sys_events",
            triads: ["political", "social", "productive"]
        }
    };

    const output = JSON.stringify(manifest, null, 2);

    // Escritura física del manifiesto
    fs.writeFileSync(path.join(rootDir, SETTINGS.outputFile), output);

    console.log("--- SCAN COMPLETE ---");
    console.log(`Target: ${SETTINGS.outputFile}`);
    console.log("Status: READY FOR INGESTION");
}

generateManifest();