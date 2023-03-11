import NextAuth, { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import EmailProvider, { SendVerificationRequestParams } from 'next-auth/providers/email';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: true,
  host: process.env.EMAIL_SERVER_HOST,
});

const emailsDir = path.resolve(process.cwd(), 'src/emails');

const sendVerificationRequest = ({ identifier, url }: SendVerificationRequestParams) => {
  const emailFile = readFileSync(path.join(emailsDir, 'confirm-email.html'), {
    encoding: 'utf8',
  });
  const emailTemplate = Handlebars.compile(emailFile);
  transporter.sendMail({
    from: `"⚡Kanban" ${process.env.EMAIL_FROM}`,
    to: identifier,
    subject: 'Your sign-in link for Kanban',
    html: emailTemplate({
      base_url: process.env.NEXTAUTH_URL,
      signin_url: url,
      email: identifier,
    }),
  });
};

const sendWelcomeEmail = async ({ user }: any) => {
  const { email } = user;

  try {
    const emailFile = readFileSync(path.join(emailsDir, 'welcome.html'), {
      encoding: 'utf8',
    });
    const emailTemplate = Handlebars.compile(emailFile);
    await transporter.sendMail({
      from: `"⚡ Kanban" ${process.env.EMAIL_FROM}`,
      to: email,
      subject: 'Welcome to Kanban! 🎉',
      html: emailTemplate({
        base_url: process.env.NEXTAUTH_URL,
        support_email: 'maharjannimesh11@gmail.com',
      }),
    });
  } catch (error) {
    console.log(`❌ Unable to send welcome email to user (${email})`);
  }
};

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    EmailProvider({
      maxAge: 10 * 60, // Magic links are valid for 10 min only
      sendVerificationRequest,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  events: { createUser: sendWelcomeEmail },
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        // Redirect to a linking page if the account is not linked
        const isLinked = await prisma.user.findFirst({ where: { id: user.id } });
        console.log('is linked: ', isLinked); // Replace with your own logic
        if (!isLinked) {
          throw new Error('OAuthAccountNotLinked');
        }
      }

      return true;
    },
  },
};

export default NextAuth(authOptions);
