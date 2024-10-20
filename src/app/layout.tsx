import '../globals.css';
import * as React from 'react';
import QueryClientProvider from '~/components/query-client-provider';
import { GlobalToastRegion } from '~/components/toast-provider';
import NProgress from '~/components/nprogress';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="h-full w-full">
        <QueryClientProvider>
          <React.Suspense>
            {children}
            <NProgress />
          </React.Suspense>
        </QueryClientProvider>
        <GlobalToastRegion />
      </body>
    </html>
  );
}
