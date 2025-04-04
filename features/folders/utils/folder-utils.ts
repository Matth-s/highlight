import { prisma } from '@/lib/prisma';
import { FolderSubFolderAndParentFolder } from '../types/folder-type';

export const getAllParentFolders = async (
  folderId: string
): Promise<FolderSubFolderAndParentFolder[]> => {
  let parents: FolderSubFolderAndParentFolder[] = [];
  let currentFolder = await prisma.folder.findUnique({
    where: { id: folderId },
    include: { parentFolder: true },
  });

  while (currentFolder?.parentFolder) {
    parents.push(
      currentFolder.parentFolder as FolderSubFolderAndParentFolder
    );
    currentFolder = await prisma.folder.findUnique({
      where: { id: currentFolder.parentFolder.id },
      include: { parentFolder: true },
    });
  }

  return parents;
};
