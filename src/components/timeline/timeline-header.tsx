import React, { CSSProperties, useState } from 'react'
import useTimelineStore from '~/store/timeline-store';
import Button from '../button';
import { formatHHMMSSmm } from '~/utils/format-time';
import useVideoPlayerStore from '~/store/video-player-store';
import ImportVideo from '../video/import-video';

const menuStyles: CSSProperties = {
  position: 'absolute',
  top: '100%',
  left: '0',
  zIndex: 1000,
};

const TimelineHeader = () => {
  const playhead = useTimelineStore((state) => state.playhead);
  const duration = useTimelineStore((state) => state.duration);
  const isPlaying = useTimelineStore((state) => state.isPlaying);
  const canCutMedia = useTimelineStore((state) => state.canCutMedia);
  const canChangeTrackMediaDown = useTimelineStore((state) => state.canChangeTrackMediaDown);
  const canChangeTrackMediaUp = useTimelineStore((state) => state.canChangeTrackMediaUp);
  const play = useTimelineStore((state) => state.play);
  const pause = useTimelineStore((state) => state.pause);
  const setPlayhead = useTimelineStore((state) => state.setPlayhead);
  const incrementZoom = useTimelineStore((state) => state.incrementZoom);
  const recording = useVideoPlayerStore((state) => state.recording);
  const startMediaRecorder = useVideoPlayerStore((state) => state.startMediaRecorder);
  const stopMediaRecorder = useVideoPlayerStore((state) => state.stopMediaRecorder);
  const display2DCanvas = useVideoPlayerStore((state) => state.display2DCanvas);
  const setDisplay2DCanvas = useVideoPlayerStore((state) => state.setDisplay2DCanvas);

  const [isMenuOpen, setIsMenuOpen] = useState(false);


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
  const changeTrackMedia = useTimelineStore((state) => state.changeTrackMedia);

  return (
    <header className='flex gap-2 items-center p-2'>
      <p>{formatHHMMSSmm(playhead)} / {formatHHMMSSmm(duration)}</p>
      <div style={{ position: 'relative' }}>
        <Button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ paddingLeft: '51px', paddingRight: '51px' }}>Actions</Button>
        {isMenuOpen && (
          <div style={menuStyles}>
            <Button onClick={cutMedia} disabled={!canCutMedia} style={{ width: '100%', justifyContent:'center' }}>Couper</Button>
            <Button onClick={() => changeTrackMedia(true)} disabled={!canChangeTrackMediaUp} style={{ width: '100%', justifyContent:'center' }}>Vers le haut</Button>
            <Button onClick={() => changeTrackMedia(false)} disabled={!canChangeTrackMediaDown} style={{ width: '100%', justifyContent:'center' }}>Vers le bas</Button>
          </div>
        )}
      </div>
      <Button onClick={isPlaying ? pause : play} className='ml-auto' disabled={recording || playhead === duration}>{displayPlayButtonText()}</Button>
      <Button onClick={() => setDisplay2DCanvas(!display2DCanvas)}>{display2DCanvas ? 'Hide' : 'Show'} 2D Canvas</Button>
      <Button onClick={handleRecording}>{recording ? "Stop" : "Start"} recording</Button>
      <Button onClick={() => setPlayhead(0)}>Reset</Button>
      <Button onClick={() => setPlayhead(duration)}>Max</Button>
      <Button onClick={() => incrementZoom(-50)}>-</Button>
      <Button onClick={() => incrementZoom(50)}>+</Button>
      <ImportVideo />
    </header>
  )
}

export default TimelineHeader
