import Credentials from 'next-auth/providers/credentials';
import { CredentialsSignin, type NextAuthConfig } from 'next-auth';
import { getUserByEmail } from '@/data/user';
import { loginSchema } from '@/features/auth/schema/login-schema';
import { comparePassword } from '../bcrypt';

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          throw new CredentialsSignin();
        }

        const { email, password } = validatedFields.data;

        const exitingUser = await getUserByEmail(email);

        const correctPassword = await comparePassword(
          password,
          exitingUser?.password ? exitingUser.password : ''
        );

        if (!correctPassword || !exitingUser) {
          throw new CredentialsSignin();
        }

        return exitingUser;
      },
    }),
  ],
} satisfies NextAuthConfig;
