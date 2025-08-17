'use client';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

export default function ToastProvider() {
  const [position, setPosition] = useState<'bottom-center' | 'top-right'>(
    'top-right'
  );

  useEffect(() => {
    const checkScreenSize = () => {
      setPosition(window.innerWidth < 768 ? 'bottom-center' : 'top-right');
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div>
      <Toaster
        position={position}
        reverseOrder={false}
        containerClassName="max-w-[1900px] mx-auto px-4"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#1D4ED8',
            color: '#FCD34D', // zlatna
            fontWeight: 600,
            borderRadius: '8px',
            padding: '12px 16px',
            margin: '80px 20px',
          },
          success: {
            iconTheme: {
              primary: '#4ade80', // zelena
              secondary: '#1E3A8A',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444', // crvena
              secondary: '#1E3A8A',
            },
          },
        }}
      />
    </div>
  );
}
