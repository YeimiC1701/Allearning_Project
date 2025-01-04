// src/pages/_app.tsx
import { AppProps } from 'next/app';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { GlobalStyles } from '../styles/GlobalStyles';
import Layout from '@/components/Layout/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { userState } from '@/atoms/userState';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/firebase';
import { Suspense } from 'react';

const AppContent = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const fetchUserProfile = async (uid: string) => {
      const userDoc = await getDoc(doc(firestore, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser({
          uid,
          name: userData?.name || 'Usuario',
          profileImage: userData?.profileImage || 'avatar.png',
        });
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserProfile(user.uid);
      } else {
        setUser({
          uid: '',
          name: 'Usuario',
          profileImage: 'avatar.png',
        });
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  const isLoginOrRegisterPage = router.pathname === '/LoginPage' || router.pathname === '/RegisterPage' || router.pathname === '/Bienvenida' || router.pathname === '/RestPassword';

  return (
    <>
      <GlobalStyles />
      {isLoginOrRegisterPage ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
};

function MyApp(props: AppProps) {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <AppContent {...props} />
      </Suspense>
    </RecoilRoot>
  );
}

export default MyApp;
