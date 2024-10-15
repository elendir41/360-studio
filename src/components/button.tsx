import * as React from 'react';
import { cn } from '~/utils/cn';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'small' | 'large';
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'text' | 'outline';
}

const Button = (props: Props) => {
  const { size = 'default', variant = 'primary', className, children, ...rest } = props;

  const colorsByVariant = {
    primary: 'rounded-xl bg-primary-turquoise text-white hover:bg-teal-500 disabled:bg-gray-300',
    secondary: 'rounded-xl bg-primary-yellow text-white hover:bg-yellow-600 disabled:bg-gray-300',
    danger: 'rounded-xl bg-red-400 text-white hover:bg-red-500 disabled:bg-gray-300',
    ghost: 'rounded-xl hover:bg-gray-50 disabled:bg-gray-400 disabled:text-gray-400',
    outline:
      'rounded-xl border border-primary-turquoise text-primary-turquoise hover:bg-primary-turquoise/10 disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400',
    text: 'rounded-lg text-gray-800 hover:bg-gray-100 disabled:bg-gray-50 disabled:text-gray-500',
  };
  const sizesByVariant = {
    default: 'h-12 px-8 text-lg',
    small: 'h-10 px-6',
    large: 'h-16 px-12 text-lg',
  };

  return (
    <button
      {...rest}
      type={rest.type || 'button'}
      className={cn(
        `flex items-center gap-2 rounded-full font-semibold transition`,
        sizesByVariant[size],
        colorsByVariant[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
