import React, { PropsWithChildren } from 'react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { MdOutlineDashboard } from 'react-icons/md';

type P = PropsWithChildren;

const inter = Inter({
  preload: false,
  fallback: ['system-ui'],
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

const MainSharedLayout = ({ children }: P) => {
  const isSidebarCollapsed = useAppSelector((state: RootState) => state.sharedStore.isSidebarCollapsed);
  return (
    <>
      <Head>
        <title>Tazk</title>
      </Head>
      <div className={`flex min-h-screen ${inter.className}`}>
        <div className="bg-base-300 rounded-tr-box rounded-br-box absolute bottom-8 left-0 w-20 h-8"></div>
        <div className="fixed h-full w-60 z-30 p-4 mt-[2.5px]">
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
          <button className="btn btn-circle absolute bottom-8 -right-8 btn-sm">
            <AiOutlineArrowLeft></AiOutlineArrowLeft>
          </button>
        </div>
        <div className="flex flex-col ml-64 flex-1">
          <header className="h-20 flex items-center px-6 sticky top-0 backdrop-blur !z-20">Header</header>
          <main className="flex-1 p-6 bg-base-200">{children}</main>
        </div>
      </div>
    </>
  );
};

export default MainSharedLayout;
