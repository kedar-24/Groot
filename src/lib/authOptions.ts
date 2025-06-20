// Ensure you have nanoid installed
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
    // Add 'google' to providers array (if not already linked)
    if (!existingUser.providers.includes("google")) {
      existingUser.providers = [...new Set([...existingUser.providers, "google"])] as ("credentials" | "google")[];
      await existingUser.save();
    }

    // ✅ Link Google login to existing user — don't create or overwrite anything
    return true;
  } else {
    // New Google signup → create user
    await User.create({
      email: user.email,
      username: user.name || "google_user",  // only set once
      image: user.image || "",               // only set once
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
