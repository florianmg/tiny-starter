import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';
import { pages } from '@/constants/pages.constants';
import { ProfileMenu } from '@/components/profile-menu';

type DashboardWrapperProps = {
  children: React.ReactNode;
};

const DashboardWrapper: FC<DashboardWrapperProps> = ({ children }) => {
  return (
    <div>
      <div className="navbar bg-base-100 h-nav max-w-page mx-auto px-6">
        <div className="navbar-start">
          <Link href={pages.dashboard}>
            <Image src="images/logo.svg" alt="logo" width={180} height={70} />
          </Link>
        </div>
        <div className="navbar-end">
          <ProfileMenu />
        </div>
      </div>
      <div className="flex max-w-page mx-auto py-6 gap-x-9">
        <nav>
          <ul>
            <li>MENU 01</li>
            <li>MENU 02</li>
          </ul>
        </nav>
        <main>{children}</main>
      </div>
    </div>
  );
};

export { DashboardWrapper };
