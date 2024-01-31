/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/pdf',
//         destination: '/PdfViewer',
//       },
//     ];
//   },
// };

module.exports = {
  env: {
    API_URL: 'https://empleosapi.prodominicana.gob.do', // Apunta a tu API Nest.js
  },
};

