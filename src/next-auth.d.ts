//next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      providers: ("credentials" | "google")[];
      id: string;
      userId?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;

      jobRole: string;
      businessDetails: string;
      workingCity: string;
      workingState: string;
      fieldsOfExpertise: string[];
      graduationYear: any;
      degree: string;
      linkedin: string;
    };
    providers?: string[];
  }
}