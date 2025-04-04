import { z } from 'zod';

export const newSubFolderSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'Champ requis',
  }),
  parentFolderId: z.string().trim().min(1, {
    message: 'Champ requis',
  }),
});

export type newSubFolderType = z.infer<typeof newSubFolderSchema>;
