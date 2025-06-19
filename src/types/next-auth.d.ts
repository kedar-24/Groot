import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      jobRole?: string | null;
      businessDetails?: string | null;
      workingCity?: string | null;
      workingState?: string | null;
      fieldsOfExpertise?: string[] | null;
      graduationYear?: number | null;
      degree?: string | null;
      linkedin?: string | null;
      id?: string | null;
    };
  }
}