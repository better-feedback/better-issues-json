import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_OATH_ID,
      clientSecret: process.env.GITHUB_OATH_SECRET,
    }),
  ],
  debug: false,
};

export default (req, res) => NextAuth(req, res, options);
