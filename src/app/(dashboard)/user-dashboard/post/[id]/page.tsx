'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import logo from '../../../../../../public/images/logo-dub.png';

export default function PostDetailPage() {
  const { id } = useParams();
  const { data: session, status } = useSession();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => setPost(data));
    }
  }, [id]);

  if (status === 'loading') return <div>Учитавање...</div>;
  if (!session) return <div>Морате бити пријављени</div>;
  if (!post) return <div>Учитавање објаве...</div>;

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto flex flex-col justify-center">
      {/* Naslov */}
      <h1 className="text-2xl flex justify-center md:text-4xl  font-bold mb-6 text-center">
        {post.title}
      </h1>

      {/* Uvod */}
      <div
        className="text-xl md:text-2xl my-6 prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.excerpt }}
      />

      {/* Slika */}
      <div className="mb-6">
        {post.images && post.images.length > 0 ? (
          <img
            src={post.images[0]}
            alt={post.title}
            className="w-full h-auto rounded-lg object-cover"
          />
        ) : (
          <Image
            src={logo}
            alt="logo"
            className="w-full h-auto rounded-lg object-cover"
          />
        )}
      </div>

      {/* Glavni tekst */}
      <div
        className="text-2xl prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.mainText }}
      />
    </div>
  );
}
