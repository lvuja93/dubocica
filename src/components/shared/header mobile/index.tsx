'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import logo from '../../../../public/images/logo-dub.png';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const HeaderMobile = () => {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') return null; // sprečava treptanje

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    toast.success('Успешно сте се одјавили!', { duration: 3000 });
    router.push('/');
  };

  const handleRedirect = () => {
    if (session?.user?.role === 'ADMIN') {
      router.push('/admin-dashboard');
    } else if (session?.user?.role === 'USER') {
      router.push('/user-dashboard/post');
    }
  };

  return (
    <header className="md:hidden bg-[#1E3A8A] text-[#FCD34D] font-semibold px-4">
      {/* Gornji red */}
      <div className="grid grid-cols-3 items-center justify-between h-16">
        {/* Hamburger meni */}
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Logo u sredini */}
        <div className="flex justify-center items-center">
          <Link href="/" onClick={() => setOpen(false)}>
            <Image
              src={logo}
              alt="logo"
              className=" w-14 flex justify-center items-center"
            />
          </Link>
        </div>

        {/* Prazan prostor da centriramo logo */}
        <div className="flex justify-center">
          <Link
            href={'/turnir'}
            className="text-xl font-semibold bg-[#F59E0B] hover:bg-[#3B82F6] py-1 px-2 rounded-xl text-white transition disabled:bg-gray-400 hover:cursor-pointer underline underline-offset-4"
          >
            Турнир
          </Link>
        </div>
      </div>

      {/* Padajući meni */}
      {open && (
        <nav className="flex flex-col gap-4 pb-4 border-t border-gray-300 pt-4">
          <Link href="/" onClick={() => setOpen(false)}>
            Почетна
          </Link>
          <Link href="/" onClick={() => setOpen(false)}>
            О нама
          </Link>
          <Link href="/" onClick={() => setOpen(false)}>
            Новости
          </Link>

          {/* Prijava / Odjava */}
          {!session ? (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex gap-2 justify-end"
            >
              Пријава
              <LogIn />
            </Link>
          ) : (
            <div className="flex flex-col justify-end gap-4">
              <button onClick={handleRedirect} className="flex justify-end">
                Контролни панел{' '}
              </button>
              <button
                onClick={handleSignOut}
                className="flex gap-2 justify-end"
              >
                Одјава
                <LogOut />
              </button>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};

export default HeaderMobile;
