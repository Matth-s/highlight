'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { newSubFolderType } from '../schema/new-sub-folder-schema';
import { formErrorHelper } from '@/helpers/form-error-helper';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FormRootError from '@/components/FormRootError';
import SubmitButton from '@/components/SubmitButton';
import { newSubFolderAction } from '../action/new-sub-folder-action';

type AddSubFolderFormProps = {
  closeModal: () => void;
};

const AddSubFolderForm = ({ closeModal }: AddSubFolderFormProps) => {
  const {
    id,
  }: {
    id: string[];
  } = useParams();

  const lastPartId = id[id.length - 1];

  const form = useForm<newSubFolderType>({
    defaultValues: {
      name: '',
      parentFolderId: lastPartId,
    },
  });

  const handleFormSubmit = async (data: newSubFolderType) => {
    try {
      await newSubFolderAction(data);
      closeModal();
    } catch (err) {
      form.setError('root', {
        message: formErrorHelper(err),
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-4"
        onSubmit={form.handleSubmit((data) => handleFormSubmit(data))}
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du sous dossier</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nom du dossier" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormRootError
          message={form.formState.errors.root?.message}
        />

        <SubmitButton
          text="Créer le dossier"
          isDisabled={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
};

export default AddSubFolderForm;
