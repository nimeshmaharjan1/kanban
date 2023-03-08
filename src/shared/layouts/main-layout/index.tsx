import React, { PropsWithChildren } from 'react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { MdOutlineDashboard } from 'react-icons/md';
import classNames from 'classnames';
import { toggleSidebar } from '@/store/slices/shared';

type P = PropsWithChildren;

const inter = Inter({
  preload: false,
  fallback: ['system-ui'],
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

const MainSharedLayout = ({ children }: P) => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state: RootState) => state.sharedStore.isSidebarCollapsed);
  return (
    <>
      <Head>
        <title>Tazk</title>
      </Head>
      <div className={`flex min-h-screen ${inter.className}`}>
        <div
          className={classNames(
            'bg-base-300 cursor-pointer hover:text-white hover:shadow-lg rounded-tr-box rounded-br-box transition-all absolute bottom-8 left-0 w-16 h-8 items-center justify-center z-40 flex',
            {
              'opacity-100': isSidebarCollapsed,
              'opacity-0': !isSidebarCollapsed,
            }
          )}
          onClick={() => dispatch(toggleSidebar())}
        >
          <AiOutlineArrowRight className="text-sm"></AiOutlineArrowRight>
        </div>
        <div
          className={classNames('fixed h-full w-60 z-30 p-4 mt-[2.5px] transition-all', {
            'opacity-0 duration-75': isSidebarCollapsed,
            'opacity-100 duration-1000': !isSidebarCollapsed,
          })}
        >
          <h1 className="font-[600] text-2xl text-primary p-1">Tazk</h1>
          <nav className="mt-12">
            <p className="uppercase tracking-wide opacity-50 text-sm font-[500]">All Boards (3)</p>
            <section className="boards-section mt-6 flex flex-col gap-3 max-h-60 overflow-y-auto scrollbar-hide pr-4">
              <button className="btn justify-start btn-primary !normal-case gap-2">
                <MdOutlineDashboard className="text-lg"></MdOutlineDashboard>
                Ekbana
              </button>
              <button className="btn justify-start btn-ghost !normal-case gap-2">
                <MdOutlineDashboard className="text-lg"></MdOutlineDashboard>
                Digital Marketing
              </button>
              <button className="btn justify-start btn-ghost !normal-case gap-2">
                <MdOutlineDashboard className="text-lg"></MdOutlineDashboard>
                Test Plans
              </button>
              <button className="btn justify-start btn-ghost !normal-case gap-2">
                <MdOutlineDashboard className="text-lg"></MdOutlineDashboard>
                Research
              </button>
              <button className="btn justify-start btn-ghost !normal-case gap-2">
                <MdOutlineDashboard className="text-lg"></MdOutlineDashboard>
                Research
              </button>
              <button className="btn justify-start btn-ghost !normal-case gap-2">
                <MdOutlineDashboard className="text-lg"></MdOutlineDashboard>
                Research
              </button>
              <button className="btn justify-start btn-ghost !normal-case gap-2">
                <MdOutlineDashboard className="text-lg"></MdOutlineDashboard>
                Research
              </button>
              <button className="btn justify-start btn-ghost !normal-case gap-2">
                <MdOutlineDashboard className="text-lg"></MdOutlineDashboard>
                Research
              </button>
              <button className="btn justify-start btn-ghost !normal-case gap-2">
                <MdOutlineDashboard className="text-lg"></MdOutlineDashboard>
                Research
              </button>
              <button className="btn justify-start btn-ghost !normal-case gap-2">
                <MdOutlineDashboard className="text-lg"></MdOutlineDashboard>
                Research
              </button>
            </section>
          </nav>
          <button className="btn btn-circle absolute bottom-8 -right-8 btn-sm" onClick={() => dispatch(toggleSidebar())}>
            <AiOutlineArrowLeft></AiOutlineArrowLeft>
          </button>
        </div>
        <div
          className={classNames('flex flex-col ml-64 flex-1 transition-all duration-300', {
            'ml-0': isSidebarCollapsed,
          })}
        >
          <header className="h-20 flex items-center px-6 sticky top-0 backdrop-blur !z-20">Header</header>
          <main className="flex-1 p-6 bg-base-200">{children}</main>
        </div>
      </div>
    </>
  );
};

export default MainSharedLayout;
