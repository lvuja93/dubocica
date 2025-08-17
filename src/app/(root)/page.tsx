'use client';
import LatestPosts from '@/components/shared/LatestPosts';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="">
      <div className=" flex flex-col justify-center text-center items-center">
        <div className="">
          <h1 className="text-center text-gray-900 text-2xl font font-semibold md:text-4xl  mx-8 md:mx-0 py-3 mb-4 rounded-xl md:px-4 pt-20">
            Добродошли на званични веб сајт насеља Дубочица
          </h1>
          <h2 className="text-xl">Сајт је још увек у изради</h2>
        </div>
        <div className="flex justify-center items-center text-center py-10">
          <Link
            href={'/turnir'}
            className="text-xl md:text-2xl font-semibold bg-[#F59E0B] hover:bg-[#3B82F6] py-2 px-4 rounded-xl text-white transition disabled:bg-gray-400 hover:cursor-pointer underline underline-offset-8"
          >
            Пријави екипу за турнир
          </Link>
        </div>
      </div>
      <LatestPosts />
    </div>
  );
}
