import React from 'react';

type HeaderFolderIdProps = {
  name: string;
};

const HeaderFolderId = ({ name }: HeaderFolderIdProps) => {
  return (
    <div className="flex items-center w-full h-16 px-8 bg-slate-700">
      <h1>
        Dossier : <span>{name}</span>
      </h1>
    </div>
  );
};

export default HeaderFolderId;
