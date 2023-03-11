import ThemeToggler from '@/shared/components/theme-toggler';
import { useAppSelector, RootState } from '@/store';
import classNames from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiUser } from 'react-icons/bi';

const Header = () => {
  const { data: session, status } = useSession();
  const isSidebarCollapsed = useAppSelector((state: RootState) => state.sharedStore.isSidebarCollapsed);

  return (
    <>
      <header
        className={classNames(
          'h-[5.05rem] z-30 px-6 fixed top-0 left-0 w-full bg-base-200 flex items-center justify-between transition-all duration-500',
          {
            'pl-[16rem]': !isSidebarCollapsed,
            'pl-[5.8rem]': isSidebarCollapsed,
          }
        )}>
        <div className="title-section font-[600] mb-[0.6rem]">Board Title</div>
        <div className="actions flex gap-3 items-center">
          <ThemeToggler></ThemeToggler>

          {status === 'authenticated' ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar online p-1">
                {session.user?.image ? (
                  <Image src={session.user.image} alt="user" className="rounded-full" width={400} height={400} />
                ) : (
                  <Image src="/icons/user/user-icon.png" className="rounded-full" alt="user" width={400} height={400} />
                )}
              </label>
              <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={async () => signOut({ redirect: true, callbackUrl: 'http://localhost:3000' })}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <Link href="/api/auth/signin" className="btn btn-primary btn-sm !text-xs">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
