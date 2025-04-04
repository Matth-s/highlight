'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/SubmitButton';
import ShowPassword from './ShowPassword';
import FormRootError from '@/components/FormRootError';
import { signupAction } from '../actions/signup-action';
import AuthFormLink from './AuthFormLink';
import { signupSchema, signupType } from '../schema/signup-schema';
import { formErrorHelper } from '@/helpers/form-error-helper';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<signupType>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(signupSchema),
  });

  const handleFormSubmit = async (data: signupType) => {
    try {
      await signupAction(data);
    } catch (err) {
      form.setError('root', {
        message: formErrorHelper(err),
      });
    }
  };

  return (
    <Card className="sm:w-[400px] w-[95%] m-auto">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold text-gray-800">
          Inscrivez-vous avec votre email
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-y-4"
            onSubmit={form.handleSubmit((data) =>
              handleFormSubmit(data)
            )}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mot de passe"
                      {...field}
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmez le mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      placeholder="Confirmez le mot de passe"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ShowPassword
              showPassword={showPassword}
              setShowPassword={() => setShowPassword((prev) => !prev)}
              label="Afficher les mots de passe"
            />

            <FormRootError
              message={form.formState.errors.root?.message}
            />

            <SubmitButton
              className="w-full"
              text="S'inscrire"
              isDisabled={form.formState.isSubmitting}
            />
          </form>
        </Form>

        <CardFooter>
          <AuthFormLink
            text="Vous avez déjà un compte ?"
            linkPath="/authentification/connexion"
            linkName="Connectez-vous"
          />
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
