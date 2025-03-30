// next.config.mjs

const nextConfig = {
  transpilePackages: ['@mui/material', '@mui/system', '@mui/icons-material'],
  images: {
    domains: ['fakeimg.pl'],
  },
};

export default nextConfig;
