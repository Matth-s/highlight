import { z } from 'zod';

export const newFolderSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'Champ requis',
  }),
});

export type newFolderType = z.infer<typeof newFolderSchema>;
