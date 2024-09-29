"use client";

import * as React from 'react';
// import RecordScene from '~/components/three/record-scene';
import Timeline from '~/components/timeline/timeline';

import dynamic from 'next/dynamic'
import ThreeScene from '~/components/three/three-scene';
import MainScene from '~/components/three/test';

const RecordScene = dynamic(() => import('~/components/three/record-scene'), { ssr: false });

const Page = () => {
  return (
    <main className='flex flex-col h-full'>
      <RecordScene />
      <Timeline />
    </main>
  );
};

export default Page;
