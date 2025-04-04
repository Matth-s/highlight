'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const UploadVideoForm = () => {
  const form = useForm();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(e.target);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter une video</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <input type="file" />

            <button type="submit">dedeede</button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UploadVideoForm;
