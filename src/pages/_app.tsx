import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import nookies from 'nookies';
import { useEffect } from 'react';
import { useAuthStore, PremiumPlan } from '@/store/auth.store';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '@/configs/client.firebase';
import { pages } from '@/constants/pages.constants';
import { isInFreeTrial } from '@/lib/utils';

const App = ({ Component, pageProps }: AppProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const setPremiumPlan = useAuthStore((state) => state.setPremiumPlan);

  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
      } else {
        const token = await user.getIdToken(true);
        const decodedToken = await auth.currentUser?.getIdTokenResult();
        nookies.set(undefined, 'token', token, { path: pages.home });
        if (decodedToken?.claims?.stripeRole) {
          setPremiumPlan(decodedToken?.claims?.stripeRole as PremiumPlan);
        } else if (isInFreeTrial(user.metadata.creationTime)) {
          setPremiumPlan('trial');
        }
        setUser(user);
      }
    });
  }, [setPremiumPlan, setUser]);

  return <Component {...pageProps} />;
};

export default appWithTranslation(App);
