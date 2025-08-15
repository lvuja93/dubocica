'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/images/logo-dub.png';

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
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex justify-center">
        Последње новости
      </h2>

      {/* Mobilni - vertikalno */}
      <div className="flex flex-col gap-6 md:hidden">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="border rounded-lg overflow-hidden bg-white shadow hover:shadow-md transition"
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
              <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
              <div
                className="text-gray-600 text-sm line-clamp-3"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop - grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="border rounded-lg overflow-hidden bg-white shadow hover:shadow-md transition"
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
              <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
              <div
                className="text-gray-600 text-sm line-clamp-3"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
