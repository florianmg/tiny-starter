import Image from 'next/image';
import Link from 'next/link';
import { GetStaticPropsContext } from 'next/types';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { pages } from '@/constants/pages.constants';
import { FormInput } from '@/components/form-input';
import { LoaderOverlay } from '@/components/loader-overlay';

const registerFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const Register = () => {
  const { t } = useTranslation('register');
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
  };

  return (
    <div className="w-screen h-screen bg-primary-content flex justify-center items-center">
      <div className="flex bg-white p-6 rounded-box">
        <LoaderOverlay
          isLoading={form.formState.isSubmitting}
          className="space-y-4 w-80"
        >
          <Image
            src="/images/logo.svg"
            width={175}
            height={40}
            alt="Logo"
            className="mx-auto"
          />
          <h1 className="text-xl font-bold text-center">{t('title')}</h1>
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
            <button className="btn btn-primary w-full" type="submit">
              {t('submit')}
            </button>
          </form>
          <div className="divider">OR</div>
          <button className="btn w-full gap-3" type="submit">
            <Image
              src="/images/google-logo.webp"
              width={24}
              height={24}
              alt="Google"
            />
            {t('google')}
          </button>

          <Link
            href={pages.login}
            className="link link-hover font-bold block text-center"
          >
            {t('alreadyHaveAccount')}
          </Link>
        </LoaderOverlay>
        <div className="w-[500px] flex justify-center items-center box-border">
          <div className="text-center px-6">
            <p>
              Marketing stuff
              <span className="font-bold">
                (don&apos;t forget to create this is locales for i18n)
              </span>
            </p>
            <p>- explain free trial</p>
            <p>- No credit card required</p>
            <p>- comment from user for street cred</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['register'])),
    },
  };
}

export default Register;