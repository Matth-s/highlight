import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json(
      {
        message: 'Non autorisé',
      },
      {
        statusText: 'Non autorisé',
        status: 401,
      }
    );
  }

  try {
    const folders = await prisma.folder.findMany({
      where: {
        userId,
        parentFolder: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(folders);
  } catch {
    return NextResponse.json(
      {
        message: 'Une erreur est survenue',
      },
      {
        statusText: 'Une erreur est survenue',
        status: 500,
      }
    );
  }
};
