'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import TiptapEditor from '@/components/shared/editor/TiptapEditor';

export default function NewPostPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [title, setTitle] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [allowed, setAllowed] = useState(false);
  const [excerpt, setExcerpt] = useState('');
  const [mainText, setMainText] = useState('');

  if (status === 'loading') return null;
  if (!session) {
    router.push('/login');
    return null;
  }

  const handleSubmit = async () => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, images, allowed, excerpt, mainText }),
    });

    if (res.ok) {
      toast.success('Објава успешно креирана!');
      router.push('/user-dashboard/post');
    } else {
      toast.error('Грешка при креирању објаве.');
    }
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div className="border-2 border-[#FCD34D] rounded-xl p-6 md:p-8 bg-[#FCD34D]/20 shadow-2xl w-full max-w-4xl">
        <h1 className="text-3xl text-center font-bold text-gray-800 mb-8">
          Креирај нову објаву
        </h1>

        {/* Naslov */}
        <input
          type="text"
          placeholder="Наслов"
          className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-2.5
            text-gray-900 placeholder-gray-400 shadow-sm
            focus:outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/15
            transition mb-4 text-center"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* URL slike */}
        <input
          type="text"
          placeholder="URL слике (Enter за додавање)"
          className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-2.5
            text-gray-900 placeholder-gray-400 shadow-sm
            focus:outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/15
            transition mb-4 text-center"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (e.currentTarget.value.trim()) {
                setImages([...images, e.currentTarget.value.trim()]);
                e.currentTarget.value = '';
              }
            }
          }}
        />

        {/* Prikaz slika */}
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="w-20 h-20 border rounded overflow-hidden"
              >
                <img
                  src={img}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        )}

        {/* Checkbox allowed */}
        <label className="flex items-center gap-2 mb-6 text-gray-800">
          <input
            type="checkbox"
            checked={allowed}
            onChange={(e) => setAllowed(e.target.checked)}
          />
          Прикажи објаву
        </label>

        {/* Uvod */}
        <h2 className="font-semibold mb-2 text-gray-800">Увод</h2>
        <div className="mb-6 bg-white rounded-lg border border-gray-300 p-2 shadow-sm">
          <TiptapEditor
            value={excerpt}
            onChange={setExcerpt}
            placeholder="Напиши увод..."
          />
        </div>

        {/* Glavni deo */}
        <h2 className="font-semibold mb-2 text-gray-800">Главни текст</h2>
        <div className="mb-6 bg-white rounded-lg border border-gray-300 p-2 shadow-sm">
          <TiptapEditor
            value={mainText}
            onChange={setMainText}
            placeholder="Напиши главни део..."
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="text-xl bg-[#F59E0B] hover:bg-[#3B82F6] py-2 px-6 rounded-xl hover:cursor-pointer text-white transition"
          >
            Креирај
          </button>
        </div>
      </div>
    </div>
  );
}
