/** @type {import('next').NextConfig} */
const nextConfig = {
    
};


//const nextConfig = {};

//export default nextConfig;
export default {
  // basePath:'/bd-smartdb',
  // output: 'export',
  async rewrites() {
    return [
      {
        // source: '/db-data-go/getUsers',
        // destination: 'http://9.112.160.203/db-data-go/getUsers',
        source: '/api/:path*',
        destination: 'http://9.112.160.203/:path*',         
      },
    ];
  },
};