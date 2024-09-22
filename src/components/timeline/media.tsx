"use client";

import { DndContext, DragMoveEvent, useDroppable } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { useEffect, useId, useState } from 'react';
import useTimelineStore from '~/store/timeline-store';
import { cn } from '~/utils/cn';
import { formatHHMMSSmm, formatSSmm } from '~/utils/format-time';
import MediaResizer from './media-resizer';
import { useSortable } from '@dnd-kit/sortable';

type MediaProps = {
  trackId: number;
  mediaId: number;
  displayPreview: 'start' | 'end' | 'none';
};

const Media = ({ trackId, mediaId, displayPreview }: MediaProps) => {
  const media = useTimelineStore((state) => state.tracks.find((track) => track.id === trackId)?.items.find((item) => item.id === mediaId));
  const zoom = useTimelineStore((state) => state.zoom);
  if (!media) {
    return null;
  }

  const playhead = useTimelineStore((state) => state.playhead);
  const resizeMediaStart = useTimelineStore((state) => state.resizeMediaStart);
  const resizeMediaEnd = useTimelineStore((state) => state.resizeMediaEnd);
  const shouldPlay = media.startTime <= playhead && media.endTime >= playhead;
  const [width, setWidth] = useState((media.displayTime) * zoom);
  const [left, setLeft] = useState((media.startTime) * zoom);
  const [previousDelta, setPreviousDelta] = useState(0);

  useEffect(() => {
    const newLeft = (media.startTime) * zoom;
    setLeft((newLeft));
    const newWidth = (media.displayTime) * zoom;
    setWidth(newWidth);
  }, [media.startTime, media.displayTime, zoom]);

  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: `media-${mediaId}`,
  });

  const { setNodeRef: setNodeContainerRef } = useDroppable({
    id: `media-${mediaId}-container`,
  });

  const { setNodeRef: setNodeFirstThirdRed } = useDroppable({
    id: `media-${mediaId}-first-third`,
  });

  const { setNodeRef: setNodeSecondThirdRed } = useDroppable({
    id: `media-${mediaId}-second-third`,
  });

  function handleDragResize(event: DragMoveEvent) {
    const deltaX = event.delta.x < 0 ? Math.min(event.delta.x, -1) : Math.max(event.delta.x, 1);

    if (event.active.data.current?.position === 'start') {

      const deltaFromPreviousCall = deltaX - previousDelta;
      const durationDelta = deltaFromPreviousCall / zoom;

      resizeMediaStart(trackId, mediaId, durationDelta);
      setPreviousDelta(deltaX);
    }
    if (event.active.data.current?.position === 'end') {
      const deltaFromPreviousCall = (deltaX - previousDelta) * -1 / zoom;
      resizeMediaEnd(trackId, mediaId, deltaFromPreviousCall);
      setPreviousDelta(deltaX);
    }
  }

  function handleDragResizeEnd() {
    setPreviousDelta(0);
  }

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}

      className={cn("absolute border-primary-yellow border-2 rounded-md p-2 h-12 flex items-center justify-center",
        `${shouldPlay ? 'bg-primary-yellow' : 'bg-secondary-grey'}`)
      }
      style={{width: `${width}px`,left: `${left}px`,}}
    >
      <DndContext
        id={useId()}
        modifiers={[restrictToHorizontalAxis]}
        onDragMove={handleDragResize}
        onDragEnd={handleDragResizeEnd}
      >
        {displayPreview === 'start'
          ? <div className='absolute h-12 w-4 top-[-2px] left-[-2px] bg-primary-blue' />
          : null
        }
        <MediaResizer position={'start'} mediaId={mediaId} />
        <p className='text-center'>{media.name} début: {formatSSmm(left / zoom)} durée: {formatSSmm(media.displayTime)}</p>
        <div ref={setNodeContainerRef} className='absolute h-12 top-[-2px] left-[-2px] -z-10 border border-green-600' style={{ width: `${width}px` }} />
        <div ref={setNodeFirstThirdRed} className='absolute h-12 w-1/3 top-[-2px] left-0 -translate-x-[2px] -z-10 border border-blue-600' />
        <div ref={setNodeSecondThirdRed} className='absolute h-12 w-1/3 top-[-2px] left-2/3 translate-x-[2px] -z-10 border border-red-600' />
        <MediaResizer position={'end'} mediaId={mediaId} />
        {displayPreview === 'end'
          ? <div className='absolute h-12 w-4 top-[-2px] right-[-2px] bg-primary-blue' />
          : null
        }
      </DndContext>
    </li>
  )
}

export default Media
