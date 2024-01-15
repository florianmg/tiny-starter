import { Inter } from 'next/font/google';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { GetStaticPropsContext } from 'next/types';
import { useTranslation } from 'next-i18next';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { t } = useTranslation();
  return (
    <main>
      <p>{t('appname')}</p>
    </main>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'fr', ['common'])),
    },
  };
}
