"use client";

import { useEffect, useRef, useState } from 'react';
import useTimelineStore from '~/store/timeline-store';
import { cn } from '~/utils/cn';

type MediaProps = {
  trackId: number;
  mediaId: number;
}

const Media = ({trackId, mediaId}: MediaProps) => {
  const media = useTimelineStore((state) => state.tracks.find((track) => track.id === trackId)?.items.find((item) => item.id === mediaId));

  if (!media) {
    return null;
  }

  const playhead = useTimelineStore((state) => state.playhead);
  const shouldPlay = media.startTime + media.startOffset <= playhead && media.endTime + media.endOffset >= playhead;
  const updateMediaTimeline = useTimelineStore((state) => state.updateMediaTimeline);
  
  const [dragging, setDragging] = useState(false);
  const [marginLeft, setMarginLeft] = useState(0);
  const [draggingMargin, setDraggingMargin] = useState(0);
  const [startX, setStartX] = useState(0);

  const startZoneRef = useRef<HTMLDivElement>(null);
  const endZoneRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    console.log('mouse down');  
    e.preventDefault();
    setDragging(true);
    setStartX(e.clientX);
  }
  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(false);
    setStartX(e.clientX);
    setMarginLeft(draggingMargin);

    updateMediaTimeline(trackId, mediaId, {...media, startTime: media.startTime + draggingMargin, endTime: media.endTime + draggingMargin});
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      const diff = e.clientX - startX;
      if (marginLeft + diff < 0) {
        return;
      }
      setDraggingMargin(marginLeft + diff);
    }
  }

  useEffect(() => {
    console.log('margin', marginLeft);
  }, [marginLeft]);




  const [width, setWidth] = useState((media.duration - media.endOffset - media.startOffset) * 100);
  const [draggingState, setDraggingState] = useState<'start' | 'end' | null>(null);
  const [draggingWidth, setDraggingWidth] = useState(width);
  const [endOffsetX, setEndOffsetX] = useState(0);

  function startMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    setDraggingState('start');
  }
  

  function startMouseMove(e: React.MouseEvent) {
    if (draggingState === 'start') {
      
    }
  }
  function startMouseUp(e: React.MouseEvent) {
    e.preventDefault();
    setDraggingState(null);
  }

  function endMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    setDraggingState('end');
    setEndOffsetX(e.clientX);
  }
  function endMouseMove(e: React.MouseEvent) {
    if (draggingState === 'end') {
      const diff = e.clientX - endOffsetX;
      if (media)
        media.endOffset = diff / 100;
      console.log('diff', diff);
      setDraggingWidth(width + diff);
    }
  }
  function endMouseUp(e: React.MouseEvent) {
    e.preventDefault();
    setDraggingState(null);
    setWidth(draggingWidth);
    setEndOffsetX(e.clientX);

    if (media)
      updateMediaTimeline(trackId, mediaId, {...media});

  }







  return (
    <li
      // onMouseDown={handleMouseDown}
      // onMouseUp={handleMouseUp}
      // onMouseMove={handleMouseMove}
      // onMouseLeave={handleMouseUp}
      
      className={cn("relative border-[var(--color-primary-yellow)] border-2 rounded-md p-2 h-12", 
      `${shouldPlay ? 'bg-[var(--color-primary-yellow)]' : 'bg-[var(--color-secondary-grey)]'}`)
    }
      style={{width: `${draggingState !== null ? draggingWidth : width}px`, marginLeft: `${dragging ? draggingMargin : marginLeft}px`}}
    >
      <div ref={startZoneRef} className={`absolute h-12 w-4 left-[-1px] top-[-2px] ${draggingState === 'start' ? 'cursor-grabbing' : 'cursor-grab'}`}/>
      <p className='text-center'>{media.name}</p>
      <div 
        ref={endZoneRef}
        className={`absolute h-12 w-4 right-[-1px] top-[-2px] ${draggingState === 'end' ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={endMouseDown}
        onMouseMove={endMouseMove}
        onMouseUp={endMouseUp}
      />
    </li>
  )
}

export default Media
