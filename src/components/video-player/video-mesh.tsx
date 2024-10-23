import { useAspect, useVideoTexture } from '@react-three/drei';
import * as THREE from 'three';
import useVideoPlayerStore from '~/store/video-player-store';
import useUpdateTexture from './hooks/useUpdateTexture';
import useLoadVideoTexture from './hooks/useLoadVideoTexture';
import { MediaTimeline } from '~/types/media-timeline';
import useTimelineStore from '~/store/timeline-store';
import useGetCurrentVideoMedia from './hooks/useGetCurrentVideoMedia';

type VideoMeshProps = {
  media: MediaTimeline;
};

function VideoMesh() {
  const videoTexture = useVideoPlayerStore((state) => state.videoTexture);
  const setVideoTexture = useVideoPlayerStore((state) => state.setVideoTexture);
  const size = useAspect(4096, 2048);
  const playhead = useTimelineStore((state) => state.playhead);

  const media = useGetCurrentVideoMedia();
  const currentVideoTexture = useVideoTexture(media?.source ?? "/blackscreen.mp4", {loop: false, autoplay: false, controls: true});
  

  useUpdateTexture();
  useLoadVideoTexture();


  // if (videoTexture && currentVideoTexture.uuid === videoTexture?.uuid) {
  //   videoTexture.image.currentTime = playhead - media.originTime + media.startOffset;
  //   videoTexture.needsUpdate = true;
  // }
  // else 
  if (currentVideoTexture) {
    if (media) {
      // currentVideoTexture.image.currentTime = playhead - media.originTime + media.startOffset;
      // currentVideoTexture.image.play();
      // currentVideoTexture.needsUpdate = true;
    }
    // console.log('currentTime', currentVideoTexture);
    setVideoTexture(currentVideoTexture);
  }

  return <>
    <mesh scale={size}>
      <planeGeometry  />
      <meshBasicMaterial map={videoTexture} color={'white'} side={THREE.DoubleSide} />
    </mesh>
  </>
}
export default VideoMesh
