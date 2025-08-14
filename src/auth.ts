import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '../lib/prisma';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  // ... adapter, secret, trustHost, pages...
  providers: [
    Credentials({
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // 1) sigurno izvuci stringove
        const rawEmail =
          typeof credentials?.email === 'string' ? credentials.email : '';
        const rawPass =
          typeof credentials?.password === 'string' ? credentials.password : '';

        const email = rawEmail.trim().toLowerCase();
        const password = rawPass;

        if (!email || !password) return null;

        // 2) nadji korisnika
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.hashedPassword) return null; // runtime guard

        // 3) TS guard za hash
        const hash = user.hashedPassword as string;

        // 4) uporedi
        const ok = await bcrypt.compare(password, hash);
        if (!ok) return null;

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
