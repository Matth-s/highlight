import FolderBreadcrumb from '@/features/folders/components/FolderBreadcrumb';
import FolderList from '@/features/folders/components/FolderList';
import HeaderFolderId from '@/features/folders/components/HeaderFolderId';
import { getFolderById } from '@/features/folders/fetch/folder-fetch';
import { requiredUser } from '@/helpers/user-helper';
import React from 'react';

type FolderIdPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const FolderIdPage = async ({ params }: FolderIdPageProps) => {
  const paramId = (await params).id;
  const idArray = Array.isArray(paramId)
    ? paramId
    : paramId.split('/');

  const fullPath = `/${idArray.join('/')}`;
  const lastPart = idArray[idArray.length - 1];

  await requiredUser(`dossier/${fullPath}`);

  const folder = await getFolderById(lastPart);

  return (
    <div>
      <HeaderFolderId name={folder.name} />
      <div className="w-[90%] mx-auto mt-8">
        <FolderBreadcrumb
          fullPath={idArray}
          parentFolder={folder.parentFolder}
        />

        <FolderList
          folders={folder.subFolders}
          isSubFolder={true}
          path={`/dossier/${fullPath}`}
        />
      </div>
    </div>
  );
};

export default FolderIdPage;
