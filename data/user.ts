import { prisma } from '@/lib/prisma';

export const getUserByEmail = async (email: string) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return existingUser;
  } catch {
    return null;
  }
};

export const isExistingEmail = async (email: string) => {
  try {
    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !!existingEmail;
  } catch {
    throw new Error(
      "Une erreur est survenue lors de la vérification de l'email"
    );
  }
};

export const getUserById = async (id: string) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return existingUser;
  } catch {
    return null;
  }
};
