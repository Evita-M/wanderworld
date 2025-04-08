// next.config.mjs

const nextConfig = {
  transpilePackages: ['@mui/material', '@mui/system', '@mui/icons-material'],
  images: {
    domains: ['raw.githubusercontent.com'],
  },
};

export default nextConfig;
