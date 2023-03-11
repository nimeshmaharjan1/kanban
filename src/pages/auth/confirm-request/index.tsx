import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { NextPageWithLayout } from '@/pages/_app';
import AuthLayout from '@/features/auth/layout';

const ConfirmRequest: NextPageWithLayout = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const router = useRouter();

  if (!loading && !session) {
    router.push('/auth/signin');
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : !session ? (
        <p>Redirecting...</p>
      ) : (
        <>
          <AiFillCheckCircle className="w-14 h-14 sm:w-16 sm:h-16 text-primary" />
          <h1 className="text-2xl sm:text-4xl font-bold mt-4">You&apos;re logged in!</h1>
          <p className="text-lg sm:text-2xl mt-4">Go back to your original tab.</p>
          <p className="text-normal sm:text-lg text-gray-500 mt-6">
            You can close this window or click{' '}
            <Link className="link link-primary" href="/">
              this link
            </Link>{' '}
            to go back to the homepage.
          </p>
        </>
      )}
    </div>
  );
};

ConfirmRequest.getLayout = (page) => <AuthLayout title="Confirmed - Kanban">{page}</AuthLayout>;

export default ConfirmRequest;
