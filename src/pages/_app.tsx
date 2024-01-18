import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import NavBar from '@/components/nav-bar';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '@/configs/client.firebase';

const App = ({ Component, pageProps }: AppProps) => {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    return onIdTokenChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [setUser]);

  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
};

export default appWithTranslation(App);
