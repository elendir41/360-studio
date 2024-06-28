import * as React from 'react';
import { cn } from '~/utils/cn';

interface PaperProps {
  className?: string;
  children: React.ReactNode;
}

function Paper({ className, children }: PaperProps) {
  return (
    <div
      className={cn(
        'relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md',
        className
      )}
    >
      {children}
    </div>
  );
}

export default Paper;
