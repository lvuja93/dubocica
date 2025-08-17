'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import logo from '../../../../../../public/images/logo-dub.png';
import ShareButtons from '@/components/shared/ShareButtons';

export default function PublicPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/public/posts/${id}`)
        .then((res) => res.json())
        .then((data) => setPost(data));
    }
  }, [id]);

  if (!post) return <div className="p-6">Учитавање објаве...</div>;

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto">
      {/* Naslov */}

      <h1 className="text-4xl font-bold mb-6 text-center">{post.title}</h1>
      <div className="flex justify-end py-6">
        <ShareButtons url={window.location.href} text={post.title} />
      </div>
      {/* Uvod */}
      <div
        className="text-2xl mb-6 prose max-w-none"
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

      <div className="flex justify-end py-6">
        <ShareButtons url={window.location.href} text={post.title} />
      </div>
    </div>
  );
}
