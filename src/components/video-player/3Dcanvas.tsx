import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import useVideoPlayerStore from '~/store/video-player-store';

const ThreeDCanvas = () => {
  const texture = useVideoPlayerStore((state) => state.texture);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = 1024;
    canvasRef.current.height = 512;
  }, [canvasRef])

  if (!texture) return null;
  texture.repeat.x = -1;
  texture.wrapS = THREE.RepeatWrapping; 

  return (
    <div className='w-full h-full'>
      <Canvas
        ref={canvasRef}
        className='w-full h-full'
      >
        <ambientLight intensity={1} />
        <OrbitControls />
        <mesh>
          <sphereGeometry args={[50, 32, 32]} />
          <meshStandardMaterial map={texture} color={'white'} side={THREE.DoubleSide} />
        </mesh>
      </Canvas>
    </div>
  )
}

export default ThreeDCanvas
