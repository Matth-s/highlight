import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from './auth.config';
import { prisma } from '../prisma';
import { getUserById } from '@/data/user';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }) {
      if (!token || !token.sub) return session;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return session;

      const { email, id } = existingUser;

      session.user.id = id;
      session.user.email = email;

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
