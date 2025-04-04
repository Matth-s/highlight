import React from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type SubmitButtonProps = {
  className?: string;
  isDisabled: boolean;
  text: string;
};

const SubmitButton = ({
  className,
  isDisabled,
  text,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      className={cn('cursor-pointer', className)}
      disabled={isDisabled}
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
