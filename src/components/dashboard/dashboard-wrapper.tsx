import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';
import { dashboardNavigation, pages } from '@/constants/pages.constants';
import { ProfileMenu } from '@/components/profile-menu';
import { useTranslation } from 'next-i18next';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type DashboardWrapperProps = {
  children: React.ReactNode;
};

const DashboardWrapper: FC<DashboardWrapperProps> = ({ children }) => {
  const { t } = useTranslation('common');
  const pathname = usePathname();

  return (
    <div>
      <div className="navbar bg-base-100 h-nav max-w-page mx-auto px-6 ">
        <div className="navbar-start">
          <Link href={pages.dashboard}>
            <Image src="/images/logo.svg" alt="logo" width={180} height={70} />
          </Link>
        </div>
        <div className="navbar-end">
          <ProfileMenu />
        </div>
      </div>
      <div className="w-full h-[1px] bg-base-300" />
      <div className="flex max-w-page mx-auto py-6 gap-x-9 px-6">
        <nav>
          <ul className="flex flex-col w-56 gap-1">
            {dashboardNavigation.map((item) => (
              <Link
                href={item.path}
                key={item.label}
                className={cn('btn justify-start', {
                  'btn-neutral': pathname === item.path,
                  'btn-ghost': pathname !== item.path,
                })}
              >
                <li>{t(`dashboardNavigation.${item.label}`)}</li>
              </Link>
            ))}
          </ul>
        </nav>
        <main>{children}</main>
      </div>
    </div>
  );
};

export { DashboardWrapper };
