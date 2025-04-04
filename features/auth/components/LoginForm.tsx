'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginType } from '../schema/login-schema';
import ShowPassword from './ShowPassword';
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { loginAction } from '../actions/login-schema';
import FormRootError from '@/components/FormRootError';
import AuthFormLink from './AuthFormLink';
import { formErrorHelper } from '@/helpers/form-error-helper';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<loginType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleFormSubmit = async (data: loginType) => {
    try {
      await loginAction(data);
    } catch (err) {
      form.setError('root', {
        message: formErrorHelper(err),
      });
    }
  };

  return (
    <Card className="sm:w-[400px] w-[90%] shadow-lg rounded-xl p-6">
      <CardHeader>
        <CardTitle className="text-xl text-center font-semibold text-indigo-600">
          Connectez-vous avec vos identifiants
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
                  <FormLabel className="text-gray-700 font-semibold">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      autoComplete="email"
                      className="border-2 border-indigo-200 rounded-lg p-3"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    Mot de passe
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      autoComplete="current-password"
                      placeholder="Mot de passe"
                      className="border-2 border-indigo-200 rounded-lg p-3"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <ShowPassword
              showPassword={showPassword}
              setShowPassword={() => setShowPassword((prev) => !prev)}
              label="Afficher le mot de passe"
            />

            <FormRootError
              message={form.formState.errors.root?.message}
            />

            <SubmitButton
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
              isDisabled={form.formState.isSubmitting}
              text="Se connecter"
            />
          </form>
        </Form>

        <AuthFormLink
          linkName="Inscrivez-vous"
          linkPath="/authentification/inscription"
          text="Vous n'avez pas de compte ?"
        />
      </CardContent>
    </Card>
  );
};

export default LoginForm;
