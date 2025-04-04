'use client';

import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FolderPlus } from 'lucide-react';
import AddFolderForm from './AddFolderForm';

const AddFolderModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog
      onOpenChange={() => setIsOpen((prev) => !prev)}
      open={isOpen}
    >
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <FolderPlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créez un nouveau dossier</DialogTitle>
        </DialogHeader>

        <AddFolderForm closeModal={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddFolderModal;
