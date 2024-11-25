/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'flagsapi.com',
      },
      {
        hostname: 'cdn.flagsapi.com',
      },
    ],
  },
};

export default nextConfig;
