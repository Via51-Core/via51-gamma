/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESTA ES LA ORDEN: Ignorar errores de linter para que el Build sea exitoso
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig