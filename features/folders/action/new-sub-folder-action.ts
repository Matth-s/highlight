'use server';

import { auth } from '@/lib/auth/auth';
import {
  newSubFolderSchema,
  newSubFolderType,
} from '../schema/new-sub-folder-schema';
import { unauthorized } from 'next/navigation';
import {
  getFolderByIdAndUserId,
  isExistingNameFolder,
} from '../data/folder-data';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const newSubFolderAction = async (data: newSubFolderType) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return unauthorized();

  const validatedFields = newSubFolderSchema.safeParse(data);

  if (!validatedFields.success) {
    throw new Error('Formulaire invalide');
  }

  const { parentFolderId, name } = validatedFields.data;

  const existingParentFolder = await getFolderByIdAndUserId(
    parentFolderId,
    userId
  );

  if (!existingParentFolder) {
    throw new Error("Le dossier parent n'existe pas");
  }

  const isNameTaken = await isExistingNameFolder(
    name,
    existingParentFolder.id
  );

  if (isNameTaken) {
    throw new Error('Ce nom de dossier est déjà utilisé');
  }

  try {
    await prisma.folder.create({
      data: {
        parentFolderId: existingParentFolder.id,
        name,
        userId,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }

    throw new Error('Une erreur est survenue');
  }

  revalidatePath('/dossier/[id]', 'page');
};
