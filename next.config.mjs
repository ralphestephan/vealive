/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'vaety.com', pathname: '/cdn/**' },
      { protocol: 'http', hostname: 'vaety.com', pathname: '/cdn/**' },
      { protocol: 'https', hostname: '**.myshopify.com', pathname: '/**' }
    ]
  }
};
export default nextConfig;
