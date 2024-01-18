import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { GetStaticPropsContext } from 'next/types';
import { useTranslation } from 'next-i18next';
import { useAuthStore } from '@/store/auth.store';
import NavBar from '@/components/nav-bar';

export default function Dashboard() {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  return (
    <main>
      <NavBar />
      <p>this is the dashboard</p>
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
