"use client";

import {useDraggable} from '@dnd-kit/core';

type MediaResizerProps = {
  position: 'start' | 'end';
  mediaId: number;
};

function MediaResizer({position, mediaId}: MediaResizerProps) {
  const {attributes, listeners, setNodeRef } = useDraggable({
    id: `media-${mediaId}-${position}`,
    data: { position },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`absolute h-12 w-4 top-[-2px] ${position === 'start' ? 'left-[-2px]' : 'right-[-2px]'} `}
    />
  );
}

export default MediaResizer;
