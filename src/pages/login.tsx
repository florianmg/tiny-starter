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

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const Login = () => {
  const { t } = useTranslation('login');
  const [isLoading, setIsLoading] = useState(false);
  const [errorKey, setErrorKey] = useState<string>();
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onAuthSuccess = async (credentials: UserCredential) => {
    const redirection = searchParams.get('redirect');
    const user = credentials.user as User;
    const token = await user.getIdToken(true);
    setUser(user);
    nookies.set(undefined, 'token', token, { path: '/' });
    setIsLoading(false);
    if (redirection) {
      router.push(`/${redirection}`);
    } else {
      router.push(pages.dashboard);
    }
  };

  const onAuthFailure = (error: unknown) => {
    setIsLoading(false);
    setErrorKey(getI18nFirebaseErrorKey(error));
  };

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    if (isLoading) return;
    const { email, password } = data;
    try {
      setIsLoading(true);
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await onAuthSuccess(credentials);
    } catch (error) {
      onAuthFailure(error);
    }
  };

  const onGoogleAuth = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const googleProvider = new GoogleAuthProvider();
      const credentials = await signInWithPopup(auth, googleProvider);
      await onAuthSuccess(credentials);
    } catch (error) {
      onAuthFailure(error);
    }
  };

  return (
    <PageWrapperWithNavBar isContentCentered>
      <div className="w-full max-w-xs bg-white p-6 rounded-box box-content">
        <LoaderOverlay
          isLoading={isLoading}
          className="space-y-4"
          label={t('loading')}
        >
          <Image
            src="/images/logo.svg"
            width={175}
            height={40}
            alt="Logo"
            className="mx-auto"
          />
          <h1 className="text-xl font-bold text-center">{t('title')}</h1>
          {errorKey && (
            <p className="text text-error font-bold text-center">
              {t(errorKey, { defaultValue: t('errors.default') })}
            </p>
          )}
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput
              label={t('email')}
              name="email"
              type="text"
              error={
                form.formState.errors.email &&
                t(`errors.email.${form.formState.errors.email.type}`)
              }
              register={form.register}
            />
            <FormInput
              label={t('password')}
              name="password"
              type="password"
              error={
                form.formState.errors.password &&
                t(`errors.password.${form.formState.errors.password.type}`)
              }
              register={form.register}
            />
            <button
              className="btn btn-neutral w-full"
              type="submit"
              disabled={isLoading}
            >
              {t('submit')}
            </button>
          </form>
          <div className="divider">OR</div>
          <button
            className="btn w-full gap-3"
            type="button"
            onClick={onGoogleAuth}
            disabled={isLoading}
          >
            <Image
              src="/images/google-logo.webp"
              width={24}
              height={24}
              alt="Google"
            />
            {t('google')}
          </button>

          <Link
            href={pages.register}
            className="link link-hover font-bold block text-center"
          >
            {t('noAccount')}
          </Link>
        </LoaderOverlay>
      </div>
    </PageWrapperWithNavBar>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', [
        'login',
        'firebase',
        'common',
      ])),
    },
  };
}

export default Login;
