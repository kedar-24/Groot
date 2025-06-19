import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "www.livemint.com",
      "techcrunch.com",
      "d32r1sh890xpii.cloudfront.net",
      "pcdn.hu",
      "c.ndtvimg.com",
      "www.presse-citron.net",
      "securityaffairs.com",
      "s.yimg.com",
      "static.antyweb.pl",
      "www.cnet.com",
      "bitcoinist.com",
      "photos5.appleinsider.com",
      "150102931.v2.pressablecdn.com",
      "static1.xdaimages.com",
      "images.macrumors.com",
      "lh3.googleusercontent.com", // <-- Added Google profile images domain
    ], // Add any other needed domains
  },
};

module.exports = nextConfig;

export default nextConfig;
