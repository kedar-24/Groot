// lib/authOptions.ts

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/models/User";
import { nanoid } from "nanoid";
import { connectDB } from "@/lib/mongodb";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";

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

        if (!user) throw new Error("invalid credentials");
        if (!user.providers.includes("credentials")) {
          throw new Error("Please use Google login");
        }

        const isValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          image: user.image,
          userId: user.userId,
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
      const existingUser = await User.findOne({ email: user.email });

      if (account?.provider === "google") {
        if (existingUser) {
          if (!existingUser.providers.includes("google")) {
            existingUser.providers = [...new Set([...existingUser.providers, "google"])] as ("credentials" | "google")[];
            await existingUser.save();
          }
          return true;
        } else {
          await User.create({
            email: user.email,
            username: user.name || "google_user",
            image: user.image || "",
            userId: nanoid(10),
            providers: ["google"],
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
      if (!session.user?.email) return session;

      await connectDB();
      const user = await User.findOne({ email: session.user.email });

      if (user) {
        session.user.id = user._id.toString();
        session.user.userId = user.userId;
        session.user.jobRole = user.jobRole || "";
        session.user.businessDetails = user.businessDetails || "";
        session.user.workingCity = user.workingCity || "";
        session.user.workingState = user.workingState || "";
        session.user.fieldsOfExpertise = user.fieldsOfExpertise || [];
        session.user.graduationYear = user.graduationYear || "";
        session.user.degree = user.degree || "";
        session.user.linkedin = user.linkedin || "";
        session.user.image = user.image || "";
        session.user.name = user.username || "";
        session.user.providers = user.providers || [];
      }

      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
};
