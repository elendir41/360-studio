"use client";

import useTimelineStore from '~/store/timeline-store';

const TimeIndicator = () => {
  const duration = useTimelineStore((state) => state.duration);
  const zoom = useTimelineStore((state) => state.zoom);
  const times: number[] = Array.from({length: duration + 1}, (_, i) => i);
  
  return (
    <div className='relative mb-2 h-7' style={{ width: `${duration * zoom}px`}}>
      {times.map((time) => (
        <div key={time} className='absolute z-50 top-0 -translate-x-1/2 flex flex-col items-center' style={{ left: `${time * zoom}px`}}>
          <p className={`text-xs text-center`} >{time}</p>
          <div className='w-px h-3 bg-secondary-grey' />
        </div>
      ))}
    </div>
  )
}

export default TimeIndicator
