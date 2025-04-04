import { FolderSubFolderAndParentFolder } from '@/features/folders/types/folder-type';
import { getAllParentFolders } from '@/features/folders/utils/folder-utils';
import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/prisma';
import { Folder } from '@prisma/client';
import { NextResponse } from 'next/server';

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const session = await auth();
  const userId = session?.user?.id;
  const idParams = (await params).id;

  if (!userId) {
    return NextResponse.json(
      { message: 'Non autorisé' },
      { statusText: 'Non autorisé', status: 401 }
    );
  }

  if (!idParams || typeof idParams !== 'string') {
    return NextResponse.json(
      { message: 'Paramètre du dossier invalide' },
      { statusText: 'Paramètre du dossier invalide', status: 404 }
    );
  }

  try {
    const folder = await prisma.folder.findFirst({
      where: { userId, id: idParams },
      orderBy: { createdAt: 'desc' },
      include: {
        subFolders: true,
      },
    });

    if (!folder) {
      return NextResponse.json(
        { message: "Ce dossier n'existe pas" },
        { statusText: "Ce dossier n'existe pas", status: 404 }
      );
    }

    const parentFolders = await getAllParentFolders(idParams);

    const responseFolder: FolderSubFolderAndParentFolder = {
      ...folder,
      parentFolder: parentFolders,
    };

    return NextResponse.json(responseFolder);
  } catch {
    return NextResponse.json(
      { message: 'Une erreur est survenue' },
      { statusText: 'Une erreur est survenue', status: 500 }
    );
  }
};
