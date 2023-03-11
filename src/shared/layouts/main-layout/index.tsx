import React, { PropsWithChildren } from 'react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import classNames from 'classnames';
import { toggleSidebar } from '@/store/slices/shared';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

type P = PropsWithChildren;

const inter = Inter({
  preload: false,
  fallback: ['system-ui'],
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

const MainSharedLayout = ({ children }: P) => {
  const session = useSession();
  console.log(session);
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state: RootState) => state.sharedStore.isSidebarCollapsed);
  return (
    <>
      <Head>
        <title>Kanban</title>
        <link rel="icon" type="/icons/logo/Web/icons8-task-dygo-32.png" sizes="32x32" href="/icons/logo/Web/icons8-task-dygo-32.png" />
        <link rel="icon" type="/icons/logo/Web/icons8-task-dygo-16.png" sizes="16x16" href="/icons/logo/Web/icons8-task-dygo-16.png"></link>
      </Head>
      <div className={`${inter.className} flex min-h-[calc(100dvh)] w-full`}>
        <aside
          className={classNames('bg-base-200 flex-1 fixed top-0 bottom-0 left-0 z-40 transition-all duration-500', {
            'w-56': !isSidebarCollapsed,
            'w-[4.1rem]': isSidebarCollapsed,
          })}>
          <section className="mt-1">
            <div className="logo-section p-4 flex items-center gap-2">
              <Image src="/icons/logo/icons8-task-96.png" alt="logo" className="h-8 w-8 " width={250} height={250}></Image>
              <h2
                className={classNames('font-bold text-2xl text-primary', {
                  'opacity-0 transition-all': isSidebarCollapsed,
                  'opacity-100 transition-all duration-700': !isSidebarCollapsed,
                })}>
                Kanban
              </h2>
            </div>
            <ul className="mt-3 space-y-4">
              <li
                className={classNames('cursor-pointer bg-primary text-white p-2 h-12 items-center gap-3', {
                  flex: !isSidebarCollapsed,
                  block: isSidebarCollapsed,
                })}>
                <div
                  className={classNames('bg-secondary w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2', {
                    'flex-1 ml-[0.4rem]': isSidebarCollapsed,
                    'flex-none ml-[0.5rem]': !isSidebarCollapsed,
                  })}>
                  <Image src="/icons/unkown.png" className="w-8 h-8" alt="unknown board" height={250} width={250} />
                </div>
                <span
                  className={classNames('', {
                    'opacity-0': isSidebarCollapsed,
                    'opacity-100 transition-all duration-700': !isSidebarCollapsed,
                  })}>
                  Ekbana
                </span>
              </li>
            </ul>
          </section>
          <button className="absolute btn !rounded-none border-2 bottom-0 left-0 right-0" onClick={() => dispatch(toggleSidebar())}>
            <AiOutlineArrowLeft
              className={classNames('transition-all duration-500', {
                'rotate-180': isSidebarCollapsed,
              })}
            />
          </button>
        </aside>
        <section className="flex-1">
          <header
            className={classNames(
              'h-[5.05rem] z-30 px-6 fixed top-0 left-0 w-full bg-base-200 flex items-center justify-between transition-all duration-500',
              {
                'pl-[16rem]': !isSidebarCollapsed,
                'pl-[5.8rem]': isSidebarCollapsed,
              }
            )}>
            <div className="title-section font-[600] mb-[0.6rem]">Board Title</div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-9 rounded-full bg-primary">
                  <BiUser className="w-6 h-6 text-white ml-[0.41rem] mt-[0.35rem]" />
                </div>
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
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </header>
          <main
            className={classNames('m-6 mt-[6.5rem] transition-all duration-500', {
              'ml-64': !isSidebarCollapsed,
              'ml-[6rem]': isSidebarCollapsed,
            })}>
            {children}
          </main>
        </section>
      </div>
    </>
  );
};

export default MainSharedLayout;
