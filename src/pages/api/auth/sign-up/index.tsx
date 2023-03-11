import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SECRET_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create user
    const user = await supabase.auth.signUp({ email, password });

    res.status(200).json({ message: 'User successfully created.', user, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error signing up' });
  }
}
