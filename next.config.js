/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'ohpldinktpofyatjafei.supabase.co',
      'k.kakaocdn.net',
      'my-threads-beige.vercel.app',
      '*',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
