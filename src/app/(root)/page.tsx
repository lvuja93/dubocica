'use client';
import Image from 'next/image';
import logo from '../../../public/images/logo-dub.png';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="">
      <div className="relative">
        <Image src={logo} alt="logo" className="h-auto w-screen opacity-10" />

        {/* centriran tekst */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="">
            <h1 className="text-center text-2xl font font-semibold md:text-4xl bg-black/10 mx-8 md:mx-0 py-3 mb-4 rounded-xl md:px-4">
              Добродошли на званични веб сајт насеља Дубочица
            </h1>
            <Link
              href="/"
              className="border mt-8 py-2 px-4 text-xl md:text-2xl rounded-xl bg-white"
            >
              Прочитај новости
            </Link>
          </div>
          <div className="flex justify-center items-center text-center"></div>
        </div>
      </div>
    </div>
  );
}
