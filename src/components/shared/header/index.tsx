import Image from 'next/image';
import logo from '../../../../public/images/logo-dub.png';
import Link from 'next/link';
import { LogIn } from 'lucide-react';

const Header = () => {
  return (
    <div>
      <header className="hidden md:grid grid-cols-3 px-2 text-black font-semibold bg-gray-200  ">
        <div className="flex items-center justify-center gap-4 focus:underline">
          <Link href="/">Почетна</Link>
          <Link href="/">О нама</Link>
          <Link href="/">Новости</Link>
        </div>
        <div className="flex justify-center items-center">
          <Link href="/">
            <Image src={logo} alt="logo" className="w-18 h-auto py-1"></Image>
          </Link>
        </div>
        <div className="flex items-center justify-end">
          <Link href="/" className="flex gap-2">
            Админ
            <LogIn></LogIn>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
