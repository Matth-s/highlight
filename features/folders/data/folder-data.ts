import { prisma } from '@/lib/prisma';

export const isExistingNameFolder = async (
  name: string,
  parentFolderId: string | null
): Promise<boolean> => {
  try {
    const existingFolder = await prisma.folder.findFirst({
      where: {
        AND: [
          {
            name,
          },
          { parentFolderId },
        ],
      },
    });

    return !!existingFolder;
  } catch {
    throw new Error('Une erreur est survenue');
  }
};

export const getFolderByIdAndUserId = async (
  folderId: string,
  userId: string
) => {
  try {
    const existingFolder = await prisma.folder.findFirst({
      where: {
        OR: [
          {
            parentFolderId: folderId,
          },
          {
            id: folderId,
          },
        ],
        userId,
      },
    });

    return existingFolder;
  } catch {
    throw new Error('Une erreur est survenue');
  }
};
