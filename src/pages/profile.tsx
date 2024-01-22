import Image from 'next/image';
import Link from 'next/link';
import { GetStaticPropsContext } from 'next/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useState } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import nookies from 'nookies';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from 'firebase/auth';

import { pages } from '@/constants/pages.constants';
import { FormInput } from '@/components/form-input';
import { LoaderOverlay } from '@/components/loader-overlay';
import NavBar from '@/components/nav-bar';
import { PageWrapperWithNavBar } from '@/components/page-wrapper-with-navbar';
import { auth } from '@/configs/client.firebase';
import { useAuthStore } from '@/store/auth.store';
import { getI18nFirebaseErrorKey } from '@/lib/utils';
import { PageTitle } from '@/components/page-title';

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const Login = () => {
  const { t } = useTranslation('login');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <PageWrapperWithNavBar className="pt-24 space-y-20">
      <h1>
        <PageTitle title={t('profile:pageTitle')} />
      </h1>
    </PageWrapperWithNavBar>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
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

export default Login;
