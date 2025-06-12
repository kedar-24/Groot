
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { comparePassword } from "@/utils/hash";
import type { NextAuthOptions } from "next-auth";
import { Types } from "mongoose";


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailOrUsername: { label: "Email, Username or Mobile", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.emailOrUsername || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        await connectDB();

        const { emailOrUsername, password } = credentials;

        const user = await User.findOne({
          $or: [
            { email: emailOrUsername },
            { username: emailOrUsername },
            { mobile: emailOrUsername },
          ],
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }
         console.log(password,user.password);
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid credentials");
        }

        return {
          id: (user._id as Types.ObjectId).toString(),
          name: user.username,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      await connectDB();

      if (account?.provider === "google" && user.email) {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            email: user.email,
            username: user.name,
            image: user.image,
          });
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};
