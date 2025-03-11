// /auth.ts

import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Adapter } from "@auth/core/adapters";
import { Client } from "fauna";
import { FaunaAdapter } from "@auth/fauna-adapter";
import GoogleProvider from "next-auth/providers/google";
import Google from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

const client = new Client({
  secret: process.env.AUTH_FAUNA_SECRET,
  endpoint: new URL(process.env.AUTH_FAUNA_CLIENT),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: FaunaAdapter(client),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  
});
