"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import Recorder from './recorder';
import SecondScene from './second-scene';
import * as THREE from 'three';
import { CubeCamera, OrbitControls } from '@react-three/drei';
import TwoDScene from './2d-scene';
// import SecondScene from './second-scene';
const BasicScene = lazy(() => import('./basic-scene'));
// import BasicScene from './basic-scene';



const RecordScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const twoDCancasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const recorderRef = useRef<{ takeScreenShot: () => void, endRecording: () => void, update: (camera: THREE.PerspectiveCamera, scene: THREE.Scene) => void }>(null);

  const transfered = useRef(false);

  const handleTakeScreenshot = () => {
    console.log('handleTakeScreenshot');
    if (recorderRef.current) {
      recorderRef.current.takeScreenShot();
    }
  };

  const handleEndRecording = () => {
    console.log('handleEndRecording');
    if (recorderRef.current) {
      recorderRef.current.endRecording();
    }
  }

  

  const worker = new Worker(new URL('./render-worker.jsx', import.meta.url), { type: 'module' });
  useEffect(() => {
    if (transfered.current) return;

    // if (!canvasRef.current) return;
    // console.log('transferControlToOffscreen');
    // // canvasRef.current.transferControlToOffscreen();
    // transfered.current = true;
    // // canvasRef.current.style.display = 'none';
    // const offScreenCanvas = canvasRef.current.transferControlToOffscreen();

    
    // worker.postMessage({ canvas: offScreenCanvas }, [offScreenCanvas]);

    // return () => {
    //   worker.terminate();
    // };
  }, [canvasRef.current]);

  const cubecameraRef = useRef<THREE.CubeCamera>();
  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024, {
    format: THREE.RGBFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
  });

  useEffect(() => {
    if (!cubecameraRef.current) return;
    console.log('CubeCamera useEffect');
    cubecameraRef.current.renderTarget = cubeRenderTarget;
    cubecameraRef.current.rotateY(Math.PI);
  }, [cubecameraRef]);

  return (
    <>
      <div ref={containerRef} className='h-[80%]'>
        <div id='container' className='h-[80%] flex'>

          <Canvas
            id='3d-canvas'
            ref={canvasRef}
            // fallback={<BasicScene />}
            camera={{ position: [-0.1, 0, 0] }}
            className={`w-full h-full ${transfered.current ? 'hidden' : ''}`}
          >
            <Recorder ref={recorderRef} />
            <SecondScene />
            {/* <BasicScene /> */}
            {/* <Suspense fallback={null}>
            <Recorder ref={recorderRef}/>
            </Suspense> */}
            <CubeCamera ref={cubecameraRef} near={0.1} far={1000}/>
          </Canvas>


          {/* <Canvas 
            id='2d-canvas'
            orthographic
            ref={twoDCancasRef}
            camera={{ left: 1 / -2, right: 1 / 2, top: 1 / 2, bottom:  1 / -2, near: -10000, far: 10000, position: [0, 0, 5] }}
          >
            <ambientLight intensity={1} />
            <BasicScene />
            <OrbitControls />
            <TwoDScene cubeCameraRef={cubecameraRef.current} canvasRef={twoDCancasRef} />
          </Canvas> */}
        </div>
        <div>
          <button onClick={handleTakeScreenshot}>Take Screenshot</button>
          <button onClick={handleEndRecording}>Fin de record</button>
        </div>
      </div>

    </>
  )
}

export default RecordScene
