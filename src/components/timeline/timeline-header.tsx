import React from 'react'
import useTimelineStore from '~/store/timeline-store';
import Button from '../button';
import { formatHHMMSSmm } from '~/utils/format-time';
import ImportVideo from '../video/import-video';

const TimelineHeader = () => {
  const playhead = useTimelineStore((state) => state.playhead);
  const duration = useTimelineStore((state) => state.duration);
  const isPlaying = useTimelineStore((state) => state.isPlaying);
  const play = useTimelineStore((state) => state.play);
  const pause = useTimelineStore((state) => state.pause);
  const setPlayhead = useTimelineStore((state) => state.setPlayhead);
  const incrementZoom = useTimelineStore((state) => state.incrementZoom);

  return (
    <header className='flex gap-2 items-center p-2'>
      <p>{formatHHMMSSmm(playhead)} / {formatHHMMSSmm(duration)}</p>
      <Button onClick={play} className='ml-auto' disabled={isPlaying || playhead === duration}>Lecture</Button>
      <Button onClick={pause} disabled={!isPlaying}>Pause</Button>
      <Button onClick={() => setPlayhead(0)}>Reset</Button>
      <Button onClick={() => setPlayhead(duration)}>Max</Button>
      <Button onClick={() => incrementZoom(-50)}>-</Button>
      <Button onClick={() => incrementZoom(50)}>+</Button>
      <ImportVideo />
    </header>
  )
}

export default TimelineHeader
