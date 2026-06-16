/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Canonical legal routes mirror the live site (/cookie_policy, /tos, /privacy).
  // These redirects keep the cleaner aliases working so no inbound link 404s.
  async redirects() {
    return [
      { source: "/cookie-policy", destination: "/cookie_policy", permanent: true },
      { source: "/terms", destination: "/tos", permanent: true },
    ];
  },
};

export default nextConfig;
