import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import bcrypt from "bcrypt";
import User from "models/userModel";
import { connectDB } from "utils/connectDB";

async function login(credentials) {
  try {
    await connectDB();
    const user = await User.findOne({ username: credentials.username });
    if (!user) throw new Error("User not found.");

    const isCorrect = await bcrypt.compare(credentials.password, user.password);
    if (!isCorrect) throw new Error("Invalid password.");

    return user; // Make sure to return the user object here
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
          const user = await login(credentials);
          return user;
        } catch (error) {
          throw new Error("Failed to login");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.username;
        token.email = user.email;
        token.id = user.id;
      }
      console.log("Token generated: ", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.id = token.id;
      }
      console.log("Session: ", session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
