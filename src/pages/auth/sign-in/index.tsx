import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/router';
import { signIn, getSession, SignInResponse, useSession } from 'next-auth/react';
import { AiOutlineGoogle, AiOutlineThunderbolt } from 'react-icons/ai';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { BsFacebook } from 'react-icons/bs';
import AuthLayout from '@/features/auth/layout';
import { NextPageWithLayout } from '@/pages/_app';
import { Toast, showToast } from '@/shared/utils/toast.util';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const MagicLinkModal = ({ show = false, email = '' }) => {
  if (!show) return null;

  return createPortal(
    <div className="fixed inset-0 z-10 bg-base-300 bg-opacity-90 backdrop-filter backdrop-blur-md backdrop-grayscale">
      <div className="min-h-screen px-6 flex flex-col items-center justify-center animate-zoomIn">
        <div className="flex flex-col items-center justify-center text-center max-w-sm">
          <HiOutlineMailOpen className="flex-shrink-0 w-10 h-10 text-primary" />
          <h3 className="mt-2 text-2xl font-semibold text-primary-focus">Confirm your email</h3>
          <p className="mt-4 text-lg text-primary-focus">
            We emailed a magic link to <strong>{email}</strong>. Check your inbox and click the link in the email to login.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

const SignIn: NextPageWithLayout = () => {
  const session = useSession();
  console.log(session);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let intervalId: any;
    let redirecting = false;

    if (showModal) {
      intervalId = setInterval(async () => {
        const session = await getSession();
        if (session && !redirecting) {
          // User connected using the magic link -> redirect him/her
          redirecting = true;
          router.push((router.query?.callbackUrl as string) || '/');
        }
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [showModal, router]);

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    try {
      showToast(Toast.info, 'Loading...', 1000);
      setDisabled(true);
      // Perform sign in
      const response: SignInResponse = (await signIn('email', {
        email,
        redirect: false,
        callbackUrl: `${window.location.origin}/auth/confirm-request`,
      })) as any;
      // Something went wrong
      if (response?.error) {
        throw new Error(response?.error);
      }
      setShowModal(true);
      showToast(Toast.success, 'Magic link sent successfully.', 1000);
    } catch (error) {
      console.error(error);
      showToast(Toast.error, 'Something went wrong please try again later.');
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <AiOutlineThunderbolt className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 text-blue-500" />
      </div>
      <h1 className="mt-2 text-2xl sm:text-4xl text-center font-bold">Sign in to your account</h1>
      <form onSubmit={handleSignIn} className="mt-8 rounded-lg shadow-md bg-base-200  px-4 py-6 sm:px-8 sm:py-8 space-y-6 w-full max-w-md">
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="label">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="elon@spacex.com"
            disabled={disabled}
            className="input"
          />
        </div>
        <button type="submit" disabled={disabled} className="btn btn-primary btn-block">
          {disabled ? 'Loading...' : 'Sign in'}
        </button>
        <p className={`text-center my-3 or-sign-in text-sm md:text-md`}>Or sign in with</p>
        <div className="card-actions justify-center !gap-3">
          <button onClick={() => signIn('google', { redirect: false })} className="btn !normal-case gap-2 hover:text-primary">
            <AiOutlineGoogle className="text-lg" />
            Google
          </button>
          <button className="btn !normal-case gap-2 hover:text-primary" onClick={() => signIn('github', { redirect: false })}>
            <FaGithub className="text-lg" />
            Github
          </button>
          <button className="btn !normal-case gap-2 hover:text-primary">
            <BsFacebook className="text-lg" />
            Facebook
          </button>
        </div>
      </form>

      <MagicLinkModal show={showModal} email={email} />
    </div>
  );
};

SignIn.getLayout = (page) => <AuthLayout title="Sign In - Kanban">{page}</AuthLayout>;

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session);
  if (session) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
      props: {},
    };
  }
  return {
    props: {},
  };
};
