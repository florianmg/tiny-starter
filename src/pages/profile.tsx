import { GetServerSidePropsContext, GetStaticPropsContext } from 'next/types';
import { useRouter } from 'next/navigation';
import { ReactNode, useState, FC, Fragment } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import nookies from 'nookies';

import { PageWrapperWithNavBar } from '@/components/page-wrapper-with-navbar';
import { useAuthStore } from '@/store/auth.store';
import { PageTitle } from '@/components/ui/page-title';
import { pages } from '@/constants/pages.constants';
import { auth } from '@/configs/admin.firebase';
import { createPortalLink } from '@/stripe/createPortalLink';
import { Loader2 } from 'lucide-react';
import { prependListener } from 'process';

const ProfileCard: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="bg-white p-6 rounded-box box-content space-y-3">
    {children}
  </div>
);

const Profile = () => {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const premiumPlan = useAuthStore((state) => state.premiumPlan);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onUpdateSubscription = async () => {
    if (premiumPlan === 'trial' || premiumPlan === null) {
      router.push(pages.pricing);
    } else {
      setIsLoading(true);
      try {
        const portalLinkUrl = await createPortalLink();
        router.push(portalLinkUrl);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  return (
    <PageWrapperWithNavBar className="pt-24 space-y-12">
      <h1>
        <PageTitle title={t('profile:pageTitle')} />
      </h1>

      <div className="max-w-sm mx-auto space-y-6">
        {isLoading ? (
          <div className="text-center space-y-3">
            <Loader2 className="mx-auto animate-spin" size={64} />
            <p>{t('profile:stripeRedirect')}</p>
          </div>
        ) : (
          <Fragment>
            <ProfileCard>
              <div>
                <p>{t('profile:currentSubscription')}</p>
                <p className="font-extrabold text-4xl">
                  {t(`profile:plan.${premiumPlan}`)}
                </p>
              </div>
              <button
                className="btn btn-neutral w-full"
                onClick={onUpdateSubscription}
              >
                {t('profile:update')}
              </button>
            </ProfileCard>
            <ProfileCard>
              <div>
                <p className="font-bold">{t('profile:email')}</p>
                <p>{user?.email}</p>
              </div>
            </ProfileCard>
          </Fragment>
        )}
      </div>
    </PageWrapperWithNavBar>
  );
};

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
      ...(await serverSideTranslations(context.locale || 'en', [
        'profile',
        'firebase',
        'common',
      ])),
    },
  };
}

export default Profile;
