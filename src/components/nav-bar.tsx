import { useAuthStore } from '@/store/auth.store';
import Link from 'next/link';

const NavBar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {user ? (
          <li>
            <button onClick={() => logout()}>logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link href="/login">login</Link>
            </li>
            <li>
              <Link href="/register">register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
