import { useAspect, useVideoTexture } from '@react-three/drei';
import * as THREE from 'three';
import useVideoPlayerStore from '~/store/video-player-store';
import useUpdateTexture from './hooks/useUpdateTexture';
import usePreviewTimelineVideo from './hooks/usePreviewTimelineVideo';
import useGetCurrentVideoMedia from './hooks/useGetCurrentVideoMedia';
import { useEffect } from 'react';

function VideoMesh() {
  const videoTexture = useVideoPlayerStore((state) => state.videoTexture);
  const setVideoTexture = useVideoPlayerStore((state) => state.setVideoTexture);
  const size = useAspect(4096, 2048);
  const media = useGetCurrentVideoMedia();
  const currentVideoTexture = useVideoTexture(media?.source ?? "/blackscreen.mp4", {loop: false, autoplay: false, controls: true, playsInline: false});

  useEffect (() => {
    if (currentVideoTexture) {
      setVideoTexture(currentVideoTexture);
    }
  }, [currentVideoTexture]);

  useUpdateTexture();
  usePreviewTimelineVideo();


  return <>
    <mesh scale={size}>
      <planeGeometry  />
      <meshBasicMaterial map={videoTexture} color={'white'} side={THREE.DoubleSide} />
    </mesh>
  </>
}
export default VideoMesh
