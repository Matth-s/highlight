import Link from 'next/link';
import React from 'react';

type AuthFormLinkProps = {
  linkPath: string;
  linkName: string;
  text: string;
};

const AuthFormLink = ({
  text,
  linkName,
  linkPath,
}: AuthFormLinkProps) => {
  return (
    <div className="flex w-full  flex-col items-center justify-center gap-x-2 mt-4 text-sm">
      <p>{text}</p>
      <Link
        href={linkPath}
        className="text-blue-600 hover:underline text-sm"
      >
        {linkName}
      </Link>
    </div>
  );
};

export default AuthFormLink;
