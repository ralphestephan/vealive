/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
  remotePatterns: [
  { protocol: 'https', hostname: 'cdn.shopify.com' },
  { protocol: 'https', hostname: 'shopify-assets.shopifycdn.com' },
  ],
  },
  };


export default nextConfig;
