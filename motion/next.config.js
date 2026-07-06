/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output for Railway-style deployments — the deploy step must
  // copy .next/static → .next/standalone/.next/static and public →
  // .next/standalone/public (standalone output omits static assets).
  output: 'standalone',
};

module.exports = nextConfig;
