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
        hostname: 'ohpldinktpofyatjafei.supabase.co',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
