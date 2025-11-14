/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Configuración de internacionalización de Next.js
  i18n: {
    locales: ['es', 'en'], // idiomas soportados
    defaultLocale: 'es',    // idioma por defecto
  },

  // Configuración experimental
  experimental: {
    // Turbopack todavía experimental; si causa problemas, desactívalo en versiones >=16.1
    // turbo: false, // Descomentar si quieres usar Webpack en lugar de Turbopack
    runtime: 'nodejs', // mejora compatibilidad con librerías que requieren Node
  },

  // Configuración de headers o rewrites opcional
  // async rewrites() {
  //   return [
  //     { source: '/:locale', destination: '/' }, // ejemplo de rewrite
  //   ];
  // },
};

module.exports = nextConfig;