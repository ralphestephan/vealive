/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'vealive360.com', pathname: '/cdn/**' },
      { protocol: 'http', hostname: 'vealive360.com', pathname: '/cdn/**' },
      { protocol: 'https', hostname: '**.myshopify.com', pathname: '/**' }
    ]
  }
};
export default nextConfig;

