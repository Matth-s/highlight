import React from 'react';
import AddFolderModal from './AddFolderModal';
import FolderItem from './FolderItem';
import { Folder } from '@prisma/client';
import AddSubFolderModal from './AddSubFolderModal';

type FolderListProps = {
  folders: Folder[];
  isSubFolder: boolean;
  path?: string;
};

const FolderList = async ({
  folders,
  isSubFolder,
  path = '/dossier',
}: FolderListProps) => {
  return (
    <div className="flex items-center w-full">
      <div className="flex flex-wrap gap-4">
        {folders.map((folder) => (
          <FolderItem key={folder.id} folder={folder} path={path} />
        ))}
      </div>

      <div className="ml-auto">
        {isSubFolder ? <AddSubFolderModal /> : <AddFolderModal />}
      </div>
    </div>
  );
};

export default FolderList;
