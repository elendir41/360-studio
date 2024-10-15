import * as React from 'react';
import { cn } from '~/utils/cn';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<Props> = (props) => {
  return (
    <input
      {...props}
      className={cn(
        'w-full truncate rounded-xl border border-gray-300 px-4 py-3 transition',
        'hover:border-gray-400',
        'focus:outline-none',
        'disabled:bg-gray-50 disabled:text-gray-500',
        props.className
      )}
    />
  );
};

export default Input;
