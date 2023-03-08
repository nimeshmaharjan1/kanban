import React from 'react';
import { NextPageWithLayout } from './_app';
import MainSharedLayout from '@/shared/layouts/main-layout';

const Home: NextPageWithLayout = () => {
  return <div>Home</div>;
};

export default Home;

Home.getLayout = (page) => {
  return <MainSharedLayout>{page}</MainSharedLayout>;
};
