import React, { TextareaHTMLAttributes } from 'react';
import { cn } from '~/utils/cn';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({ className, ...props }: Props) => {
  return (
    <textarea
      {...props}
      className={cn(
        'w-full truncate rounded-xl border border-gray-300 px-4 py-3 transition',
        'hover:border-gray-400',
        'focus:outline-none',
        'disabled:bg-gray-50 disabled:text-gray-500',
        className
      )}
    />
  );
};

export default Textarea;
