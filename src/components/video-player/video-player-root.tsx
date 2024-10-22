"use client";

import React from 'react'
import useExportSubscriber from './hooks/useExportSubscriber';
import useVideoPlayerStore from '~/store/video-player-store';
import TwoDCanvas from './2Dcanvas';
import ThreeDCanvas from './3Dcanvas';

/**
 * Root component for the video player
 * Only import this component in the main app
 */

const VideoPlayerRoot = () => {
  useExportSubscriber();
  const display2DCanvas = useVideoPlayerStore((state) => state.display2DCanvas);

  return (
    <div className='flex flex-1 flex-row w-screen overflow-hidden'>
      <div className={display2DCanvas ? 'm-auto' : 'absolute -left-[-10000px]'}>
        <TwoDCanvas />
      </div>
      <div className={display2DCanvas ? 'absolute -left-[-10000px]' : 'w-full'}>
        <ThreeDCanvas />
      </div>
    </div>
  )
}

export default VideoPlayerRoot
