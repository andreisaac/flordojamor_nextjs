
const nextConfig = {
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "pt", // default lang pt
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  experimental: {
    esmExternals: "loose", // <-- add this
    serverComponentsExternalPackages: ["mongoose"] // <-- and this
  },
  // and the following to enable top-level await support for Webpack
  webpack: (config, { isServer }) => {
    console.log();
    if(!isServer){
      config.resolve.fallback = {
       fs: false,
     };
    }
    return config;
  },
}
