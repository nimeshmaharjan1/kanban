import Head from 'next/head';
import React, { PropsWithChildren } from 'react';

type P = {
  title: string;
  children: React.ReactNode;
};
const AuthLayout: React.FC<P> = ({ children, title }) => {
  return (
    <div className="flex h-[100dvh] items-center justify-center">
      <Head>
        <title>{title}</title>

        <link rel="icon" type="/icons/logo/Web/icons8-task-dygo-32.png" sizes="32x32" href="/icons/logo/Web/icons8-task-dygo-32.png" />
        <link rel="icon" type="/icons/logo/Web/icons8-task-dygo-16.png" sizes="16x16" href="/icons/logo/Web/icons8-task-dygo-16.png"></link>
      </Head>
      {children}
    </div>
  );
};

export default AuthLayout;
