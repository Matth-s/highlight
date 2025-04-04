import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().min(1, {
    message: 'Email requis',
  }),
  password: z.string().trim().min(1, {
    message: 'Mot de passe requis',
  }),
  code: z.optional(z.string()),
});

export type loginType = z.infer<typeof loginSchema>;
