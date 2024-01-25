import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { GetStaticPropsContext } from 'next/types';
import { PageWrapperWithNavBar } from '@/components/page-wrapper-with-navbar';

export default function Home() {
  return (
    <PageWrapperWithNavBar>
      <p>faq page</p>
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
