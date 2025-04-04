import { z } from 'zod';

const passwordRegex =
  /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

export const signupSchema = z
  .object({
    email: z.string().email({ message: 'Email invalide' }),
    password: z
      .string()
      .min(8, {
        message:
          'Le mot de passe doit contenir au moins 8 caractères',
      })
      .regex(passwordRegex, {
        message:
          'Le mot de passe doit contenir au moins un chiffre et un caractère spécial',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export type signupType = z.infer<typeof signupSchema>;
