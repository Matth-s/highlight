import { Folder } from '@prisma/client';

export interface FolderSubFolderAndParentFolder extends Folder {
  subFolders: {
    name: string;
    id: string;
    createdAt: Date;
    parentFolderId: string | null;
    userId: string;
  }[];
  parentFolder: {
    id: string;
    name: string;
    createdAt: Date;
    parentFolderId: string | null;
    userId: string;
  }[];
}
