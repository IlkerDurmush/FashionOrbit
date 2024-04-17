/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fashion-orbit.vercel.app", // if your website has no www, drop it
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
