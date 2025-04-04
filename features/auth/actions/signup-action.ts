'use server';

import { isExistingEmail } from '@/data/user';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/bcrypt';
import { signupSchema, signupType } from '../schema/signup-schema';
import { signIn } from '@/lib/auth/auth';

export const signupAction = async (data: signupType) => {
  const validatedFields = signupSchema.safeParse(data);

  if (!validatedFields.success) {
    throw new Error('Formulaire invalide');
  }

  const { email, password } = validatedFields.data;

  const existingEmail = await isExistingEmail(email);

  if (existingEmail) {
    throw new Error('Cet email est déjà utilisé');
  }

  const hashedPassword = await hashPassword(password);

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    await signIn('credentials', {
      email,
      password,
      redirect: true,
      redirectTo: '/',
    });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === 'NEXT_REDIRECT') throw err;
    }

    throw new Error('Une erreur est survenue');
  }
};
