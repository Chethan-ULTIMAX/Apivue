import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const githubConfigured = Boolean(process.env.GITHUB_ID && process.env.GITHUB_SECRET);

export const authEnabled = Boolean(process.env.NEXTAUTH_SECRET && githubConfigured);

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  providers: githubConfigured ? [GitHubProvider({ clientId: process.env.GITHUB_ID!, clientSecret: process.env.GITHUB_SECRET! })] : [],
  pages: { error: "/login" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider && account.providerAccountId) {
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;
      }
      if (profile && "id" in profile) token.providerAccountId = String(profile.id);
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = `apivue:${token.provider ?? "provider"}:${token.providerAccountId ?? token.sub}`;
        session.user.provider = typeof token.provider === "string" ? token.provider : undefined;
      }
      return session;
    },
  },
};
