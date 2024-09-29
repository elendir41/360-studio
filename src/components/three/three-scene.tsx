"use client";

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import BasicScene from './basic-scene';
import SecondScene from './second-scene';

const ThreeScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function record() {
    console.log('record');
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const stream = canvas.captureStream();
    const mediaRecorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];
    mediaRecorder.ondataavailable = (e) => {
      console.log('ondataavailable');
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      console.log('onstop');
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'video.webm';
      a.click();
      URL.revokeObjectURL(url);
    };

    mediaRecorder.start();
    const timeout = setTimeout(() => {
      mediaRecorder.stop();
    }, 2000);
  }

  return (
    <>
      <div ref={containerRef} className='flex-1 relative'>
        <Canvas
          ref={canvasRef}
          camera={{ position: [-0.1, 0, 0] }}
          className='w-full h-full'
        >
          <Suspense fallback={null}>
            <BasicScene />
            {/* <SecondScene /> */}
          </Suspense>
        </Canvas>
        <button onClick={record} className='absolute top-0 left-0'>Record</button>
      </div>
    </>
  )
}

export default ThreeScene
