import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { toggleSidebar } from '@/store/slices/shared';
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state: RootState) => state.sharedStore.isSidebarCollapsed);
  return (
    <>
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
    </>
  );
};

export default Sidebar;
