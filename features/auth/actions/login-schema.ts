'use server';

import { signIn } from '@/lib/auth/auth';
import { loginSchema, loginType } from '../schema/login-schema';
import { AuthError } from 'next-auth';

export const loginAction = async (data: loginType) => {
  const validatedFields = await loginSchema.safeParse(data);

  if (!validatedFields.success) {
    throw new Error('Formulaire invalide');
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof Error) {
      const { type } = error as AuthError;

      switch (type) {
        case 'CredentialsSignin':
          throw new Error('Email ou mot de passe invalide');
        case 'CallbackRouteError':
          throw error;
      }
    }

    throw error;
  }
};
