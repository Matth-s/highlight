export const formErrorHelper = (err: unknown) => {
  if (err instanceof Error) {
    if (err.message === 'NEXT_REDIRECT') return;

    return err.message;
  }

  return 'Une erreur est survenue';
};
