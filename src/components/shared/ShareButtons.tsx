'use client';

import { Facebook, Instagram, Copy, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ShareButtons({
  url,
  text,
}: {
  url: string;
  text: string;
}) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Линк је успешно копиран');
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error('Копирање није успело ❌');
    }
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank'
    );
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Погледај пост 👇',
          text: text,
          url: url,
        });
        toast.success('Успешно подељено 🎉');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      await copyToClipboard();
      toast('Browser не подржава Share API, линк је копиран 📋');
    }
  };

  return (
    <div className="flex gap-2 md:gap-4">
      <button onClick={shareOnFacebook} className="text-blue-600">
        <Facebook />
      </button>
      <button onClick={copyToClipboard} className="text-pink-500">
        <Instagram />
      </button>
      <button onClick={copyToClipboard} className="text-gray-600">
        <Copy />
      </button>
      <button onClick={shareNative} className="text-green-600">
        <Share2 />
      </button>
    </div>
  );
}
