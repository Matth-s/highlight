import { Folder } from '@prisma/client';
import { Folder as FolderIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type FolderItemProps = {
  folder: Folder;
  path?: string;
};

const FolderItem = ({ folder, path }: FolderItemProps) => {
  return (
    <Link
      href={`${path}/${folder.id}`}
      className="flex gap-x-2 bg-slate-700 rounded-sm px-4 py-2"
    >
      <FolderIcon />

      <p>{folder.name}</p>
    </Link>
  );
};

export default FolderItem;
