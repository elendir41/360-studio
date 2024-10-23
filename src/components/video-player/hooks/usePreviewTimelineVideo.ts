import useVideoPlayerStore from '~/store/video-player-store';
import { useFrame } from '@react-three/fiber';
import useTimelineStore from '~/store/timeline-store';
import { useEffect, useRef } from 'react';

/**
 * This hook handle the preview of the video accoring to the timeline playhead
 *
 * If the delta between the video playhead and the timeline playhead is too big it will update the video currentTime
 *
 * It will pause the video when seeking and restore the state before seeking
 *
 * It will also increment the playhead when the video is playing
 */

const usePreviewTimelineVideo = () => {
  const videoTexture = useVideoPlayerStore((state) => state.videoTexture);

  const isPlaying = useTimelineStore((state) => state.isPlaying);
  const playhead = useTimelineStore((state) => state.playhead);
  const videoTrack = useTimelineStore((state) => state.tracks[0]);
  const incrementPlayhead = useTimelineStore((state) => state.incrementPlayhead);
  const pause = useTimelineStore((state) => state.pause);
  const play = useTimelineStore((state) => state.play);
  const setIsSeeking = useVideoPlayerStore((state) => state.setIsSeeking);

  // Using ref so it is computed during seeking and seeked events
  const prevPlayedRef = useRef(isPlaying);
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (!videoTexture)
      return;

    const handleSeeking = () => {
      prevPlayedRef.current = isPlayingRef.current;
      videoTexture.image.pause();
      setIsSeeking(true);
      pause();
    }

    const handleSeeked = () => {
      if (prevPlayedRef.current) {
        videoTexture.image.play();
        play();
      }
      else {
        videoTexture.image.pause();
        pause();
      }
      setIsSeeking(false);
    }

    videoTexture.image.addEventListener('seeking', handleSeeking);
    videoTexture.image.addEventListener('seeked', handleSeeked);

    return () => {
      videoTexture.image.removeEventListener('seeking', handleSeeking);
      videoTexture.image.removeEventListener('seeked', handleSeeked);
    }

  }, [videoTexture]);

  useFrame((_, delta) => {
    handlePlayPause();
    updateDeltaVideoPlayhead();
  
    if (isPlaying)
      incrementPlayhead(delta);
  });

  function handlePlayPause() {
    if (!videoTexture)
      return;

    if (isPlaying && videoTexture.image.paused) {
      videoTexture.image.play();
    }
    else if (!isPlaying && !videoTexture.image.paused) {
      videoTexture.image.pause();
    }
  }

  const updateDeltaVideoPlayhead = () => {
    if (!videoTrack || !videoTexture)
      return;

    for (const media of videoTrack.items) {
      if (media.startTime <= playhead && media.endTime >= playhead && videoTexture) {
        const delta = videoTexture.image.currentTime - (playhead - media.originTime + media.startOffset);
        if (delta > 0.1 || delta < -0.1) {
          videoTexture.image.currentTime = playhead - media.originTime + media.startOffset;
          videoTexture.needsUpdate = true;
          videoTexture.update();
        }
        return;
      }
    }
  }
}

export default usePreviewTimelineVideo
