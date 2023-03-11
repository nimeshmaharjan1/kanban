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
import Sidebar from './sidebar';
import Header from './header';

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
  const isSidebarCollapsed = useAppSelector((state: RootState) => state.sharedStore.isSidebarCollapsed);
  return (
    <>
      <Head>
        <title>Kanban</title>
        <link rel="icon" type="/icons/logo/Web/icons8-task-dygo-32.png" sizes="32x32" href="/icons/logo/Web/icons8-task-dygo-32.png" />
        <link rel="icon" type="/icons/logo/Web/icons8-task-dygo-16.png" sizes="16x16" href="/icons/logo/Web/icons8-task-dygo-16.png"></link>
      </Head>
      <div className={`${inter.className} flex min-h-[calc(100dvh)] w-full`}>
        <Sidebar></Sidebar>
        <section className="flex-1">
          <Header></Header>
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
