import { useDroppable } from '@dnd-kit/core';
import React from 'react'

const TrackBorder = () => {
  const { setNodeRef: startNodeRef } = useDroppable({
    id: `track-border-start`,
  });

  const { setNodeRef: endNodeRef } = useDroppable({
    id: `track-border-end`,
  });
  return (
    <>
      <div ref={startNodeRef} className='absolute w-4 left-[-4px] -translate-x-full h-12 border border-red-900'/>
      <div ref={endNodeRef}   className='absolute w-4 right-[-4px] translate-x-full h-12 border border-red-900'/>
    </>
  )
}

export default TrackBorder
