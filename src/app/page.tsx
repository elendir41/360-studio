import * as React from 'react';
import ThreeScene from '~/components/three-scene';
import VideoPlayerProvider from '~/provider/video-player-provider';

const Page = () => {
  return (
    <VideoPlayerProvider src="outputv6.mp4">
      <ThreeScene />
    </VideoPlayerProvider>
  )
};

export default Page;
