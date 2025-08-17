'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/images/logo-dub.png';

export default function LatestPosts() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/public/posts/latest')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setPosts([]);
        }
      })
      .catch(() => setPosts([]));
  }, []);

  if (!posts.length) {
    return <p className="text-gray-500 mt-6">Нема објава за приказ.</p>;
  }

  return (
    <div className="mt-10 px-4 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-10 flex justify-center">
        Актуелне објаве
      </h2>

      {/* Mobilni - vertikalno */}
      <div className="md:hidden flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="flex-shrink-0 w-[80%] snap-start border rounded-lg overflow-hidden bg-white shadow-xl hover:shadow-2xl transition"
          >
            {post.images?.[0] ? (
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
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 text-center">
                {post.title}
              </h3>
              <div
                className="text-gray-600 text-sm line-clamp-3"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop - grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-[1200px]">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="border rounded-lg overflow-hidden bg-white shadow-xl hover:shadow-2xl transition"
          >
            {post.images?.[0] ? (
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
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 text-center">
                {post.title}
              </h3>
              <div
                className="text-gray-600 text-sm line-clamp-3"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            </div>
          </Link>
        ))}
      </div>
      <div className=" flex justify-center text-xl md:justify-end pt-2 underline underline-offset-4">
        Види све објаве
      </div>
    </div>
  );
}
