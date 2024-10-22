import { useVideoTexture } from '@react-three/drei';
import useVideoPlayerStore from '~/store/video-player-store';
import { useFrame } from '@react-three/fiber';
import useTimelineStore from '~/store/timeline-store';

/**
 * Hook that loads the video texture and increments the playhead
 * For now, this hook load the texture hardcoded to apply and save it in the store
 * Later, it will maybe take an url as parameter to load the current video
 */

const useLoadVideoTexture = () => {
  const videoTexture = useVideoPlayerStore((state) => state.videoTexture);
  const setVideoTexture = useVideoPlayerStore((state) => state.setVideoTexture);
  const texture = useVideoTexture("/helico.mp4");

  const isPlaying = useTimelineStore((state) => state.isPlaying);
  const incrementPlayhead = useTimelineStore((state) => state.incrementPlayhead);
  useFrame((_, delta) => {
    if (!isPlaying) return;
    incrementPlayhead(delta);
  });


  if (videoTexture) {
    return null;
  }
  setVideoTexture(texture);
}

export default useLoadVideoTexture
