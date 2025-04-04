'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FolderPlus } from 'lucide-react';
import React, { useState } from 'react';
import AddSubFolderForm from './AddSubFolderForm';

const AddSubFolderModal = () => {
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
          <DialogTitle>Créer un sous dossier</DialogTitle>
        </DialogHeader>

        <AddSubFolderForm closeModal={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddSubFolderModal;
