import { GetServerSidePropsContext } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nookies from 'nookies';

import { DashboardWrapper } from '@/components/dashboard/dashboard-wrapper';

import { pages } from '@/constants/pages.constants';
import { auth } from '@/configs/admin.firebase';

export default function Dashboard() {
  return (
    <DashboardWrapper>
      <p>this is the settings page</p>
    </DashboardWrapper>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Get cookies
  const cookies = nookies.get(context);

  // redirect home if no token in cookies
  if (!cookies.token) {
    return {
      redirect: {
        permanent: false,
        destination: pages.home,
      },
      props: {},
    };
  }

  // verify user token validity
  const token = await auth.verifyIdToken(cookies.token);

  // Get user uid from token
  const { uid } = token;

  // Resirect home if no user in token
  if (!uid) {
    return {
      redirect: {
        permanent: false,
        destination: pages.home,
      },
      props: {},
    };
  }

  // the user is authenticated!

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'fr', [
        'common',
        'dashboard',
      ])),
    },
  };
}
