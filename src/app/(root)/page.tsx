'use client';
import LatestPosts from '@/components/LatestPosts';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="">
      <div className=" flex flex-col justify-center text-center items-center">
        <div className="">
          <h1 className="text-center text-gray-900 text-2xl font font-semibold md:text-4xl  mx-8 md:mx-0 py-3 mb-4 rounded-xl md:px-4 pt-20">
            Добродошли на званични веб сајт насеља Дубочица
          </h1>
        </div>
        <div className="flex justify-center items-center text-center"></div>
      </div>
      <LatestPosts />
    </div>
  );
}
