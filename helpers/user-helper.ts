import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';

export const requiredUser = async (callbackUrl?: string) => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(`/authentification?callbackUrl=${callbackUrl ?? '/'}`);
  }

  return session.user;
};
