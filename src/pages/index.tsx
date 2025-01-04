// pages/index.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/firebase/firebase';

const IndexPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/App');
      } else {
        router.push('/Bienvenida');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <div>Loading...</div>;
};

export default IndexPage;
