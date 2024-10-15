import * as React from 'react';
import { Icon } from '@iconify/react';
import { cn } from '~/utils/cn';

const bgColorByType = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500',
};
const colorByType = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
};
const iconByType = {
  success: 'fa6-solid:check',
  error: 'fa6-solid:xmark',
  warning: 'fa6-solid:triangle-exclamation',
  info: 'fa6-solid:circle-exclamation',
};

interface ToastProps {
  title: string;
  content: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}
const Toast = ({ title, content, type = 'success' }: ToastProps) => {
  return (
    <div className="mx-auto mt-4 flex w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md">
      <div className={cn('flex w-12 flex-shrink-0 items-center justify-center', bgColorByType[type])}>
        <Icon icon={iconByType[type]} className="h-6 w-6 text-white" />
      </div>

      <div className="-mx-3 px-4 py-2">
        <div className="mx-3">
          <span className={cn('font-semibold', colorByType[type])}>{title}</span>
          <p className="text-sm text-gray-600">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
