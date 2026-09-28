/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/me',
        destination: '/me/profile',
        permanent: true, // 301 редирект (постоянный)
        // или permanent: false для 302 редиректа (временный)
      },
    ]
  },
  webpack: (config, { isServer }) => {
    // Ignore pg-native module (it's optional)
    if (isServer) {
      config.externals = [...config.externals, 'pg-native'];
    }
    
    return config;
  },
  
  // ИСПРАВЛЕНО: Перенесено из experimental в корневой уровень
  serverExternalPackages: ['pg', 'bcryptjs', 'jsonwebtoken'],
};

export default nextConfig;
