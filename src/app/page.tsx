import * as React from 'react';
import ThreeScene from '~/components/three/three-scene';
import Timeline from '~/components/timeline/timeline';

const Page = () => {
  return (
    <main className='flex flex-col h-full'>
      <ThreeScene />
      <Timeline />
    </main>
  );
};

export default Page;
