import { Inter } from 'next/font/google';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { GetStaticPropsContext } from 'next/types';
import { useTranslation } from 'next-i18next';
import { useAuthStore } from '@/store/auth.store';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  return (
    <main>
      <p>{t('appname')}</p>
      <p>{user?.email}</p>
    </main>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'])),
    },
  };
}
