import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '../lib/prisma';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  logger: {
    error(code, ...msg) {
      console.error('[nextauth][error]', code, ...msg);
    },
    warn(code, ...msg) {
      console.warn('[nextauth][warn]', code, ...msg);
    },
    debug(code, ...msg) {
      console.debug('[nextauth][debug]', code, ...msg);
    },
  },
  events: {
    async signIn(message) {
      console.log('[event] signIn', message?.user?.email);
    },
  },
  providers: [
    Credentials({
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.hashedPassword) return null;

        const isValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isValid) return null;

        return { id: user.id, name: user.name ?? '', email: user.email ?? '' };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      // cuvamo user ID u tokenu
      if (user) token.id = (user as any).id;
      return token;
    },
    async session({ session, token }) {
      // prosledi ID u session.user
      if (session.user && token?.id) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
});

export const { GET, POST } = handlers;
