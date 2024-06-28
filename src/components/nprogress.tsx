'use client';

import { AppProgressBar } from 'next-nprogress-bar';

const NProgress = () => (
  <AppProgressBar height="2px" color="var(--color-primary-turquoise)" options={{ showSpinner: false }} shallowRouting />
);

export default NProgress;
