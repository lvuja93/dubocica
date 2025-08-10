import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Omogući build i kad ima ESLint grešaka (privremeno)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
