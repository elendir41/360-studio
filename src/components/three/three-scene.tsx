"use client";

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import BasicScene from './basic-scene';

const ThreeScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={containerRef} className='flex-1'>
        <Canvas
          ref={canvasRef}
          camera={{ position: [-0.1, 0, 0] }}
          className='w-full h-full'
        >
          <Suspense fallback={null}>
            <BasicScene />
          </Suspense>
        </Canvas>
      </div>
    </>
  )
}

export default ThreeScene
