'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import logo from '../../../../public/images/logo-dub.png';
import { LogIn } from 'lucide-react';

const HeaderMobile = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="md:hidden bg-[#1E3A8A] text-[#FCD34D] font-semibold px-4">
      {/* Gornji red */}
      <div className="flex items-center justify-between h-16">
        {/* Hamburger meni */}
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Logo u sredini */}
        <div className="flex justify-center items-center">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              className=" w-14 flex justify-center items-center"
            />
          </Link>
        </div>

        {/* Desna strana prazna ili za dodatne akcije */}
        <div className="w-7" />
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
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex gap-2 justify-end"
          >
            Админ
            <LogIn></LogIn>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default HeaderMobile;
