import React from 'react';

type FormRootErrorProps = {
  message?: string;
};

const FormRootError = ({ message }: FormRootErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-red-100 text-center font-semibold text-red-700 border border-red-300 px-4 py-2 rounded-lg text-sm shadow-md">
      {message}
    </div>
  );
};

export default FormRootError;
