import { Icon } from '@iconify/react';
import { cn } from '~/utils/cn';

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: 'success' | 'error' | 'draft' | 'info' | 'disabled';
}

const TagLarge = (props: Props) => {
  const { children, className, variant = 'success' } = props;

  const colorsByVariant = {
    success: 'text-green-400 border-green-400',
    error: 'text-red-400 border-red-400',
    info: 'text-blue-400 border-blue-400',
    draft: 'text-yellow-600 border-yellow-600',
    disabled: 'text-gray-200 border-gray-200',
  };
  const iconByVariant = {
    success: 'fa6-solid:check',
    error: 'fa6-solid:xmark',
    info: 'fa6-solid:rocket',
    draft: 'fa6-solid:file-lines',
    disabled: 'check',
  };

  return (
    <div
      className={cn(
        'flex h-8 min-w-24 items-center gap-2 rounded-lg border bg-white px-3 transition',
        colorsByVariant[variant],
        className
      )}
    >
      <span className="grow text-center font-bold">{children}</span>

      <Icon icon={iconByVariant[variant]} className="h-5 w-5 shrink-0" />
    </div>
  );
};

export default TagLarge;
