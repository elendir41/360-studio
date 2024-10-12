import React from 'react'
import useTimelineStore from '~/store/timeline-store';
import Button from '../button';
import { formatHHMMSSmm } from '~/utils/format-time';
import useVideoPlayerStore from '~/store/video-player-store';

const TimelineHeader = () => {
  const playhead = useTimelineStore((state) => state.playhead);
  const duration = useTimelineStore((state) => state.duration);
  const isPlaying = useTimelineStore((state) => state.isPlaying);
  const play = useTimelineStore((state) => state.play);
  const pause = useTimelineStore((state) => state.pause);
  const setPlayhead = useTimelineStore((state) => state.setPlayhead);
  const incrementZoom = useTimelineStore((state) => state.incrementZoom);
  const recording = useVideoPlayerStore((state) => state.recording);
  const startMediaRecorder = useVideoPlayerStore((state) => state.startMediaRecorder);
  const stopMediaRecorder = useVideoPlayerStore((state) => state.stopMediaRecorder);
  const display2DCanvas = useVideoPlayerStore((state) => state.display2DCanvas);
  const setDisplay2DCanvas = useVideoPlayerStore((state) => state.setDisplay2DCanvas);

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

  return (
    <header className='flex gap-2 items-center p-2'>
      <p>{formatHHMMSSmm(playhead)} / {formatHHMMSSmm(duration)}</p>
      <Button onClick={isPlaying ? pause : play} className='ml-auto' disabled={recording || playhead === duration}>{displayPlayButtonText()}</Button>
      <Button onClick={() => setDisplay2DCanvas(!display2DCanvas)}>{display2DCanvas ? 'Hide' : 'Show'} 2D Canvas</Button>
      <Button onClick={handleRecording}>{recording ? "Stop" : "Start"} recording</Button>
      <Button onClick={() => setPlayhead(0)}>Reset</Button>
      <Button onClick={() => setPlayhead(duration)}>Max</Button>
      <Button onClick={() => incrementZoom(-50)}>-</Button>
      <Button onClick={() => incrementZoom(50)}>+</Button>
    </header>
  )
}

export default TimelineHeader
