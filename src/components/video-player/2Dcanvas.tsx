import { Canvas } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import VideoMesh from './video-mesh'
import InfoTexture from './info-texture'
import useVideoPlayerStore from '~/store/video-player-store'

const TwoDCanvas = () => {
  const canvasRef = useVideoPlayerStore((state) => state.canvasRef);
  const setCanvasRef = useVideoPlayerStore((state) => state.setCanvasRef);
  const initialiseMediaRecorder = useVideoPlayerStore((state) => state.initialiseMediaRecorder);
  const ref = useRef(null);

  useEffect(() => {
    if (!canvasRef || !canvasRef.current) return;
    canvasRef.current.width = 1024;
    canvasRef.current.height = 512;
  }, [canvasRef])

  useEffect(() => {
    setCanvasRef(ref);
    initialiseMediaRecorder();
  }, [setCanvasRef]);

  return (
    <div className='h-full'>
      <Canvas ref={ref} orthographic>
        <ambientLight intensity={1} />
        <VideoMesh />
        <InfoTexture />
      </Canvas>
    </div>
  )
}

export default TwoDCanvas
