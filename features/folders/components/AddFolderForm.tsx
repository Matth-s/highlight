'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import {
  newFolderSchema,
  newFolderType,
} from '../schema/new-folder-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { formErrorHelper } from '@/helpers/form-error-helper';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/SubmitButton';
import { newFoldeAction } from '../action/new-folder-action';
import FormRootError from '@/components/FormRootError';

type AddFolderFormProps = {
  closeModal: () => void;
};

const AddFolderForm = ({ closeModal }: AddFolderFormProps) => {
  const form = useForm<newFolderType>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(newFolderSchema),
  });

  const handleFormSubmit = async (data: newFolderType) => {
    try {
      await newFoldeAction(data);
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
              <FormLabel>Nom du dossier</FormLabel>
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

export default AddFolderForm;
