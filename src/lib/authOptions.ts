import { nanoid } from "nanoid"; // Ensure you have nanoid installed
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials?.email });
        if (
          user &&
          (await bcrypt.compare(credentials!.password, user.password))
        ) {
          // Return the user document as a plain object, ensuring id is a string
          const typedUser = user as typeof user & { _id: Types.ObjectId };
          return {
            id: typedUser._id.toString(),
            email: typedUser.email,
            name: typedUser.username,
            image: typedUser.image,
            userId: typedUser.userId?.toString?.() ?? typedUser.userId,
          };
        }

        return null;
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
            userId: nanoid(10), // ✅ generate random userId
          });
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.userId = (user as any).userId;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        (session.user as any).id = token.id;
        (session.user as any).userId = token.userId;
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
