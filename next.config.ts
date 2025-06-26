/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "www.apple.com",
      "companieslogo.com",
      "www.google.com",
      "www.microsoft.com",
      "www.amazon.com",
      "www.facebook.com",
      "www.twitter.com",
      "www.linkedin.com",
      "www.instagram.com",
      "www.youtube.com",
      "img-prod-cms-rt-microsoft-com.akamaized.net",
      "d1a3f4spazzrp4.cloudfront.net",
      "www.tcs.com",
      "www.wired.com",
      "www.github.com",
      "www.reddit.com",
      "logo.clearbit.com",
      "www.pinterest.com",
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
      "logos-world.net",
      "lh3.googleusercontent.com", // <-- Added Google profile images domain
    ], // Add any other needed domains
  },
  reactStrictMode: false,
};

module.exports = nextConfig;

export default nextConfig;
