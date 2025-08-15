// next-auth.d.ts (u src root)
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: 'USER' | 'ADMIN' | null;
      image?: string | null;
    };
  }
}
