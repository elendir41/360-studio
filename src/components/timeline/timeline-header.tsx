import React from 'react'
import useTimelineStore from '~/store/timeline-store';
import Button from '../button';
import { formatHHMMSSmm } from '~/utils/format-time';
import useVideoPlayerStore from '~/store/video-player-store';
import ImportVideo from '../video/import-video';

const TimelineHeader = () => {
  const playhead = useTimelineStore((state) => state.playhead);
  const duration = useTimelineStore((state) => state.duration);
  const isPlaying = useTimelineStore((state) => state.isPlaying);
  const canCutMedia = useTimelineStore((state) => state.canCutMedia);
  const play = useTimelineStore((state) => state.play);
  const pause = useTimelineStore((state) => state.pause);
  const setPlayhead = useTimelineStore((state) => state.setPlayhead);
  const incrementZoom = useTimelineStore((state) => state.incrementZoom);
  const recording = useVideoPlayerStore((state) => state.recording);
  const startMediaRecorder = useVideoPlayerStore((state) => state.startMediaRecorder);
  const stopMediaRecorder = useVideoPlayerStore((state) => state.stopMediaRecorder);
  const display2DCanvas = useVideoPlayerStore((state) => state.display2DCanvas);
  const setDisplay2DCanvas = useVideoPlayerStore((state) => state.setDisplay2DCanvas);
  const videoTexture = useVideoPlayerStore((state) => state.videoTexture);

  function handleRecording() {
    if (!recording) {
      setPlayhead(0);
      play();
      startMediaRecorder();
    }
    else {
      pause();
      stopMediaRecorder();
    }
  }

  function displayPlayButtonText() {
    if (recording) {
      return "Recording";
    }
    else if (isPlaying) {
      return "Pause";
    }
    else {
      return "Play";
    }
  }
  const cutMedia = useTimelineStore((state) => state.cutMedia);

  function handlePlayPause() {
    if (isPlaying) {
      pause();
      console.log('pause before update', videoTexture.image.paused);
      videoTexture && videoTexture.image.pause();
      console.log('pause after update', videoTexture.image.paused);
    }
    else {
      play();
      console.log('play before update', videoTexture.image.paused);
      videoTexture && videoTexture.image.play();
      console.log('play after update', videoTexture.image.paused);
    }
  }

  return (
    <header className='flex gap-2 items-center p-2'>
      <p>{formatHHMMSSmm(playhead)} / {formatHHMMSSmm(duration)}</p>
      <Button onClick={handlePlayPause} className='ml-auto' disabled={recording || playhead === duration}>{displayPlayButtonText()}</Button>
      <Button onClick={() => setDisplay2DCanvas(!display2DCanvas)}>{display2DCanvas ? 'Hide' : 'Show'} 2D Canvas</Button>
      <Button onClick={handleRecording}>{recording ? "Stop" : "Start"} recording</Button>
      <Button onClick={cutMedia} disabled={!canCutMedia}>Couper</Button>
      <Button onClick={() => setPlayhead(0)}>Reset</Button>
      <Button onClick={() => setPlayhead(duration)}>Max</Button>
      <Button onClick={() => incrementZoom(-50)}>-</Button>
      <Button onClick={() => incrementZoom(50)}>+</Button>
      <ImportVideo />
    </header>
  )
}

export default TimelineHeader
