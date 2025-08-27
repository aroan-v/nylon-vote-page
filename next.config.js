/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <-- top-level, enables static export
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
}

export default nextConfig
