// ShareWrapper.tsx
'use client';
import { useEffect, useState } from 'react';
import ShareButtons from '@/components/shared/ShareButtons';

export default function ShareWrapper({ text }: { text: string }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  if (!url) return null;

  return <ShareButtons url={url} text={text} />;
}
