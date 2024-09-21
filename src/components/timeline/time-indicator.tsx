"use client";

import React from 'react'
import useTimelineStore from '~/store/timeline-store';

const TimeIndicator = () => {
  const duration = useTimelineStore((state) => state.duration);
  const times: number[] = Array.from({length: duration}, (_, i) => i);
  times.push(duration);

  return (
    <div className='w-full flex justify-between mb-2'>
      {times.map((time) => (
        <p key={time} className='text-xs'>{time}</p>
      ))}
    </div>
  )
}

export default TimeIndicator
