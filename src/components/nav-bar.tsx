import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import { useTranslation } from 'next-i18next';

import { useAuthStore } from '@/store/auth.store';
import { pages, publicNavigation } from '@/constants/pages.constants';
import { ProfileMenu } from './profile-menu';

const CenterMenu = () => {
  const { t } = useTranslation('common');
  return publicNavigation.map((item) => (
    <li key={item.label}>
      <Link href={item.path}>{t(`navbar.${item.label}`)}</Link>
    </li>
  ));
};

const NavBar = () => {
  const { t } = useTranslation('common');
  const user = useAuthStore((state) => state.user);

  return (
    <div className="navbar bg-base-100 max-w-page mx-auto h-page px-6">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <CenterMenu />
          </ul>
        </div>
        <Link href={pages.home}>
          <Image
            className="hidden lg:block"
            src="/images/logo.svg"
            width={170}
            height={40}
            alt="Logo"
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <CenterMenu />
        </ul>
      </div>
      <div className="navbar-end space-x-4">
        {user ? (
          <Fragment>
            <Link href={pages.dashboard} className="btn btn-ghost">
              {t('navbar.dashboard')}
            </Link>
            <ProfileMenu />
          </Fragment>
        ) : (
          <Fragment>
            <Link className="btn btn-ghost" href={pages.login}>
              {t('navbar.login')}
            </Link>
            <Link className="btn btn-primary" href={pages.register}>
              {t('navbar.register')}
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default NavBar;
