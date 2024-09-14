"use client";

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import VideoPlayer from './video-player';
import Recorder from './recorder';
import BasicScene from './basic-scene';

const ThreeScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const recorderRef = useRef<{ takeScreenShot: () => void }>(null);

  const handleTakeScreenshot = () => {
    if (recorderRef.current) {
      recorderRef.current.takeScreenShot();
    }
  };
  return (
    <>
      <div ref={containerRef} className='h-[80%]'>
        <div className='h-[80%]'>

          <Canvas
            ref={canvasRef}
            camera={{ position: [-0.1, 0, 0] }}
            className='w-full h-full'
          >
            <Suspense fallback={null}>
              <Recorder ref={recorderRef}/>
              <VideoPlayer />
              {/* <BasicScene /> */}
            </Suspense>
          </Canvas>
        </div>
        <div>
          <button onClick={handleTakeScreenshot}>Take Screenshot</button>
        </div>
      </div>

    </>
  )
}

export default ThreeScene
