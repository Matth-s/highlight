import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { Folder } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

type FolderBreadcrumbProps = {
  parentFolder: Folder[];
  fullPath: string[]; // ex: ['cm92sexyf0001v8x8wn0u409l', 'cm92vximo0001v8os9uefvzqy', 'cm92xhows0007v8osaeydvkom']
};

const FolderBreadcrumb = ({
  parentFolder,
  fullPath,
}: FolderBreadcrumbProps) => {
  if (parentFolder.length === 0) return null;

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dossier">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {parentFolder.map((parent, i) => {
            // Trouver l'index du dossier dans `fullPath`
            const index = fullPath.indexOf(parent.id);
            if (index === -1) return null;

            const breadcrumbPath = `/dossier/${fullPath.slice(0, index + 1).join('/')}`;

            return (
              <BreadcrumbItem key={parent.id}>
                <BreadcrumbLink asChild>
                  <Link href={breadcrumbPath}>{parent.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default FolderBreadcrumb;
