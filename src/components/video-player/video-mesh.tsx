import { useAspect } from '@react-three/drei';
import * as THREE from 'three';
import useVideoPlayerStore from '~/store/video-player-store';

function VideoMesh() {
  const videoTexture = useVideoPlayerStore((state) => state.videoTexture);  
  const size = useAspect(4096, 2048);

  if (!videoTexture) return null;
  return <>
    <mesh scale={size}>
      <planeGeometry  />
      <meshBasicMaterial map={videoTexture} color={'white'} side={THREE.DoubleSide} />
    </mesh>
  </>
}
export default VideoMesh
