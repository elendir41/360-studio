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

/**
 * Component that represents a media item on the timeline
 * It can be resized thanks to DndKit
 */

const Media = ({ trackId, mediaId, displayPreview }: MediaProps) => {
  const media = useTimelineStore((state) => state.tracks.find((track) => track.id === trackId)?.items.find((item) => item.id === mediaId));
  const zoom = useTimelineStore((state) => state.zoom);
  if (!media) {
    return null;
  }
  const selectedMedia = useTimelineStore((state) => state.selectedMedia);

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

  // Used to detect when the media is dragged to the first or last third of the container in order to display a preview
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

  function handleInnerClick(event: React.MouseEvent) {
    event.stopPropagation();
  }

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn("absolute border-2 rounded-md p-2 h-12 flex items-center justify-center",
        `${shouldPlay ? 'bg-primary-yellow' : 'bg-secondary-grey'}`,
        `${selectedMedia?.[0] == trackId && selectedMedia[1] == mediaId ? 'border-primary-blue' : 'border-primary-yellow'}`,)
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
          ? <div onClick={handleInnerClick} className='absolute h-12 w-4 top-[-2px] left-[-2px] bg-primary-blue cursor-e-resize' />
          : null
        }
        <MediaResizer position={'start'} mediaId={mediaId} />
        <p onClick={handleInnerClick} className='text-center'>{media.name} début: {formatSSmm(left / zoom)} durée: {formatSSmm(media.displayTime)}</p>
        <div ref={setNodeContainerRef} className='absolute h-12 top-[-2px] left-[-2px] -z-10 border border-green-600' style={{ width: `${width}px` }} />
        <div ref={setNodeFirstThirdRed} className='absolute h-12 w-1/3 top-[-2px] left-0 -translate-x-[2px] -z-10 border border-blue-600' />
        <div ref={setNodeSecondThirdRed} className='absolute h-12 w-1/3 top-[-2px] left-2/3 translate-x-[2px] -z-10 border border-red-600' />
        <MediaResizer position={'end'} mediaId={mediaId} />
        {displayPreview === 'end'
          ? <div onClick={handleInnerClick} className='absolute h-12 w-4 top-[-2px] right-[-2px] bg-primary-blue cursor-w-resize' />
          : null
        }
      </DndContext>
    </li>
  )
}

export default Media
