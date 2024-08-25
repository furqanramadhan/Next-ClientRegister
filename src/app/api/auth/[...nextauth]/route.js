import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { Admin, User } from "models/accountModel";
import { connectDB } from "utils/connectDB";

async function login(credentials) {
  try {
    await connectDB();

    const adminUser = await Admin.findOne({
      username: credentials.username,
    });

    if (adminUser) {
      const isCorrect = await bcrypt.compare(
        credentials.password,
        adminUser.password
      );
      if (isCorrect) {
        return { ...adminUser.toObject(), role: "admin" };
      }
    }

    const normalUser = await User.findOne({
      userName: credentials.username,
    });

    if (normalUser) {
      const isCorrect = await bcrypt.compare(
        credentials.password,
        normalUser.password
      );
      if (isCorrect) {
        return { ...normalUser.toObject(), role: "user" };
      }
    }

    throw new Error("Invalid username or password.");
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

const authOptions = {
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
        token.username = user.username || user.userName;
        token.email = user.email;
        token.id = user.id;
        token.role = user.role;
        token.companyName = user.companyName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.companyName = token.companyName;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export default handler;
