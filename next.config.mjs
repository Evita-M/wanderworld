// next.config.mjs
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  transpilePackages: ['@mui/material', '@mui/system', '@mui/icons-material'],
  images: {
    domains: ['fakeimg.pl'],
  },
};

export default nextConfig;
