// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tambahkan headers untuk Content Security Policy
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)", // Terapkan untuk semua halaman
  //       headers: [
  //         {
  //           key: "Content-Security-Policy",
  //           value:
  //             "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self';",
  //         },
  //       ],
  //     },
  //   ];
  // },
  images: {
    domains: [
      "w3s.link",
      "bafybeigmar5cy3aglukkz3nuhgqtw2opg4a3x4f5agcebfgcajstiufogy.ipfs.w3s.link"
    ],
  }

};

export default nextConfig;
