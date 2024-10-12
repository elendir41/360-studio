import React from 'react'
import TwoDCanvas from './2Dcanvas'
import ThreeDCanvas from './3Dcanvas'
import { useCanvasContext } from './canvas-context'
import useVideoPlayerStore from '~/store/video-player-store'

export default function SceneContent() {

  const { containerRef } = useCanvasContext();
  const display2DCanvas = useVideoPlayerStore((state) => state.display2DCanvas);

  return (
    <div ref={containerRef} className='flex flex-1 flex-row w-screen overflow-hidden'>
      <div className={display2DCanvas ? 'm-auto' : 'absolute -left-[-10000px]'}>
        <TwoDCanvas />
      </div>
      <div className={display2DCanvas ? 'absolute -left-[-10000px]' : 'w-full'}>
        <ThreeDCanvas />
      </div>
    </div>
  )
}
