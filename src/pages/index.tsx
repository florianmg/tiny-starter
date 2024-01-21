import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { GetStaticPropsContext } from 'next/types';
import { useTranslation } from 'next-i18next';
import { useAuthStore } from '@/store/auth.store';
import NavBar from '@/components/nav-bar';
import { PageWrapperWithNavBar } from '@/components/page-wrapper-with-navbar';

export default function Home() {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  return (
    <PageWrapperWithNavBar>
      <p>{t('appname')}</p>
      <p>{user?.email}</p>
    </PageWrapperWithNavBar>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'])),
    },
  };
}
