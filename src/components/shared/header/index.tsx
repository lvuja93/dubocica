'use client';
import Image from 'next/image';
import logo from '../../../../public/images/logo-dub.png';
import Link from 'next/link';
import { LogIn, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') return null;
  const handleSignOut = () => {
    toast.success('Успешно сте се одјавили!', { duration: 3000 });
    signOut({ callbackUrl: '/' });
  };

  const handleRedirect = () => {
    if (session?.user?.role === 'ADMIN') {
      router.push('/admin-dashboard');
    } else if (session?.user?.role === 'USER') {
      router.push('/user-dashboard');
    }
  };

  return (
    <header className="hidden md:grid grid-cols-3 pl-2 pr-8 text-[#FCD34D] font-semibold bg-[#1E3A8A]">
      {' '}
      <div className="flex items-center justify-center gap-4 text-2xl">
        {' '}
        <Link href="/" className="hover:underline underline-offset-4">
          Почетна
        </Link>
        <Link href="/" className="hover:underline underline-offset-4">
          О нама
        </Link>{' '}
        <Link href="/" className="hover:underline underline-offset-4">
          Новости
        </Link>{' '}
      </div>{' '}
      <div className="flex justify-center items-center">
        {' '}
        <Link href="/">
          {' '}
          <Image src={logo} alt="logo" className="w-18 h-auto py-1" />{' '}
        </Link>{' '}
      </div>{' '}
      <div className="flex items-center justify-end text-xl font-semibold">
        {' '}
        {!session ? (
          <Link
            href="/login"
            className="flex gap-2 hover:underline underline-offset-4"
          >
            {' '}
            Пријава <LogIn />{' '}
          </Link>
        ) : (
          <div className="flex gap-4 font-semibold">
            <button
              onClick={handleRedirect}
              className="hover:cursor-pointer hover:underline underline-offset-4"
            >
              Контролни панел{' '}
            </button>
            <button
              onClick={handleSignOut}
              className="flex gap-2 hover:cursor-pointer hover:underline underline-offset-4"
            >
              {' '}
              Одјава <LogOut />{' '}
            </button>
          </div>
        )}{' '}
      </div>{' '}
    </header>
  );
}
