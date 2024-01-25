import Link from 'next/link';
import { pages } from '@/constants/pages.constants';
import { useTranslation } from 'next-i18next';
import nookies from 'nookies';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

const ProfileMenu = () => {
  const { t } = useTranslation('common');
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const onLogout = () => {
    logout();
    nookies.destroy(null, 'token');
    router.push(pages.home);
  };

  const getProfilePicture = () => {
    return user?.email?.charAt(0).toUpperCase();
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-8">
            <span>{getProfilePicture()}</span>
          </div>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <Link href={pages.profile}>{t('navbar.profile')}</Link>
        </li>
        <li>
          <p onClick={onLogout}>{t('navbar.logout')}</p>
        </li>
      </ul>
    </div>
  );
};

export { ProfileMenu };
