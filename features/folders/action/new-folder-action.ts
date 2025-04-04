'use server';

import { auth } from '@/lib/auth/auth';
import {
  newFolderSchema,
  newFolderType,
} from '../schema/new-folder-schema';
import { unauthorized } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { isExistingNameFolder } from '../data/folder-data';
import { revalidatePath } from 'next/cache';

export const newFoldeAction = async (data: newFolderType) => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) return unauthorized();

  const validatedFields = newFolderSchema.safeParse(data);

  if (!validatedFields.success) {
    throw new Error('Formulaire invalide');
  }

  const { name } = validatedFields.data;

  const existingFolder = await isExistingNameFolder(name, null);

  if (existingFolder) {
    throw new Error('Ce nom de dossier est déjà utilisé');
  }

  try {
    await prisma.folder.create({
      data: {
        name,
        userId,
      },
    });
  } catch (err) {
    throw new Error(
      'Une erreur est survenue lors de la création du dossier'
    );
  }

  revalidatePath('/', 'page');
};
