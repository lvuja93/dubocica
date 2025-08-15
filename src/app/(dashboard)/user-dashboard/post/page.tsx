'use client';

import Link from 'next/link';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import logo from '../../../../../public/images/logo-dub.png';

const Post = () => {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'USER') {
      fetch('/api/posts')
        .then((res) => res.json())
        .then((data) => setPosts(data));
    }
  }, [status, session]);

  if (status === 'loading') return null;

  return (
    <div className="text-gray-900">
      {/* Gornji deo tvoj originalni */}
      <div className="flex justify-center">
        <h1 className="md:hidden text-2xl py-2 px-4 font-semibold items-center justify-center gap-4 ">
          Моје објаве
        </h1>
        <div className="flex justify-center fixed bottom-20 md:hidden">
          <Link href="/user-dashboard/post/add-post">
            <CirclePlus size={40} color="#1E3A8A" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 ">
        <div className="flex justify-center">
          <Link
            href="/user-dashboard/post/add-post"
            className="hidden md:flex border gap-2 py-2 px-4 text-xl font-semibold text-white md:text-xl rounded-xl bg-[#F59E0B] hover:bg-[#3B82F6]"
          >
            <CirclePlus size={30} />
            Додај нову објаву
          </Link>
        </div>
        <div className="">
          <h1 className="hidden text-3xl py-2 px-4 font-semibold md:flex items-center justify-center gap-4 ">
            Моје објаве
          </h1>
        </div>
      </div>

      {/* Lista postova ispod */}
      <div className="mt-6 grid grid-cols-1 space-y-2 md:grid-cols-3 md:gap-6 px-4">
        {posts.length === 0 ? (
          <p className="text-gray-500">Немате ниједну објаву.</p>
        ) : (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/user-dashboard/post/${post.id}`}
              className="border rounded-lg overflow-hidden bg-white shadow hover:shadow-md transition flex flex-col"
            >
              {/* Slika */}
              {post.images && post.images.length > 0 ? (
                <img
                  src={post.images[0]}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <Image
                  src={logo}
                  alt="logo"
                  className="w-full h-48 object-cover"
                />
              )}

              {/* Tekst */}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <div
                  className="text-gray-600 text-sm line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Post;
