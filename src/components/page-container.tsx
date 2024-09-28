import * as React from 'react';

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[calc(100vh-4rem)] p-4">
      <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
