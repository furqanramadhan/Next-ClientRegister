import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import bcrypt from "bcrypt";
import { Admin } from "models/accountModel";
import { connectDB } from "utils/connectDB";

async function login(credentials) {
  try {
    await connectDB();
    const adminUser = await Admin.findOne({
      username: credentials.username,
    });
    if (!adminUser) throw new Error("User not found.");

    const isCorrect = await bcrypt.compare(
      credentials.password,
      adminUser.password
    );
    if (!isCorrect) throw new Error("Invalid password.");

    return adminUser;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const adminUser = await login(credentials);
          return adminUser;
        } catch (error) {
          throw new Error("Failed to login");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, adminUser }) {
      if (adminUser) {
        token.username = adminUser.username;
        token.email = adminUser.email;
        token.id = adminUser.id;
      }
      console.log("Token generated: ", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.adminUser.username = token.username;
        session.adminUser.email = token.email;
        session.adminUser.id = token.id;
      }
      console.log("Session: ", session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
