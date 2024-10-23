import { useVideoTexture } from '@react-three/drei';
import useVideoPlayerStore from '~/store/video-player-store';
import { useFrame } from '@react-three/fiber';
import useTimelineStore from '~/store/timeline-store';

const useLoadVideoTexture = () => {
  const videoTexture = useVideoPlayerStore((state) => state.videoTexture);
  const setVideoTexture = useVideoPlayerStore((state) => state.setVideoTexture);

  const isPlaying = useTimelineStore((state) => state.isPlaying);
  const playhead = useTimelineStore((state) => state.playhead);
  const videoTrack = useTimelineStore((state) => state.tracks[0]);
  const incrementPlayhead = useTimelineStore((state) => state.incrementPlayhead);

  useFrame((_, delta) => {
    // updateVideoTrack();
    // if (videoTexture) {
    //   isPlaying ? videoTexture.image.play() : videoTexture.image.pause();
    // }
    if (!isPlaying) return;
    incrementPlayhead(delta);

  });

  const updateVideoTrack = () => {
    if (!videoTrack || !videoTexture)
      return;

    for (const media of videoTrack.items) {
      if (media.startTime <= playhead && media.endTime >= playhead && videoTexture) {
        videoTexture.image.currentTime = playhead - media.originTime + media.startOffset;
        videoTexture.needsUpdate = true;
        videoTexture.update();
        return;
      }
    }
    // setVideoTexture(null);
  }

  // if (videoTexture) {
  //   return null;
  // }
  // setVideoTexture(texture);
}

export default useLoadVideoTexture
