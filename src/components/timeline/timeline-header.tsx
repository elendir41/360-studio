import React from 'react'
import useTimelineStore from '~/store/timeline-store';
import Button from '../button';
import { formatPlayhead } from '~/utils/format-time';

const TimelineHeader = () => {
  const playhead = useTimelineStore((state) => state.playhead);
  const duration = useTimelineStore((state) => state.duration);
  const play = useTimelineStore((state) => state.play);
  const pause = useTimelineStore((state) => state.pause);
  const setPlayhead = useTimelineStore((state) => state.setPlayhead);

  return (
    <header className='flex gap-2 items-center p-2'>
      <p>Playhead: {formatPlayhead(playhead)}</p>
      <p>Duration: {formatPlayhead(duration)}</p>
      <Button onClick={play} className='ml-auto'>Play</Button>
      <Button onClick={pause}>Pause</Button>
      <Button onClick={() => setPlayhead(0)}>Reset</Button>
      <Button onClick={() => setPlayhead(20)}>Max</Button>
    </header>
  )
}

export default TimelineHeader
