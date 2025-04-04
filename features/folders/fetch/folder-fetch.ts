import { Folder } from '@prisma/client';
import { cookies } from 'next/headers';
import { FolderSubFolderAndParentFolder } from '../types/folder-type';

export const getFolders = async (): Promise<Folder[]> => {
  const cookiesSession = await cookies();

  try {
    const res = await fetch(
      `${process.env.API_PREFIX_ROUTE}/dossier`,
      {
        method: 'GET',
        headers: {
          Cookie: cookiesSession.toString(),
          'content-type': 'Application/json',
        },
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data: Folder[] = await res.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('Une erreur est survenue');
  }
};

export const getFolderById = async (
  folderId: string
): Promise<FolderSubFolderAndParentFolder> => {
  const cookiesSession = await cookies();

  try {
    const res = await fetch(
      `${process.env.API_PREFIX_ROUTE}/dossier/${folderId}`,
      {
        method: 'GET',
        headers: {
          Cookie: cookiesSession.toString(),
          'content-type': 'Application/json',
        },
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data: FolderSubFolderAndParentFolder = await res.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('Une erreur est survenue');
  }
};
