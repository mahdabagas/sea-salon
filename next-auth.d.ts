import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: { id: any; role: any; name: any };
  }
}
