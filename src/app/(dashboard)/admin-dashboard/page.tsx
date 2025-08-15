'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

export default function DashboardAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      toast.error('Мораш бити пријављен, да би приступио овој страници.');
    }
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/');
      toast.error('Немаш приступ овој страници.');
    }
  }, [status, router]);

  if (status === 'loading') return null;

  return <div className="text-3xl pt-20">Dobrodošao {session?.user?.name}</div>;
}
