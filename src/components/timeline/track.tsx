"use client";

import useTimelineStore from '~/store/timeline-store';
import Media from './media';

import { DndContext, DragEndEvent, DragMoveEvent, DragStartEvent, useDroppable } from '@dnd-kit/core';
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { useId, useState } from 'react';
import { extractMediaId, findTargetId, handleCollision } from '~/utils/drag-and-drop';
import PreviewMediaItem from '~/types/media-preview-item';

type TrackProps = {
  trackId: number;
}

const Track = ({ trackId }: TrackProps) => {
  const track = useTimelineStore((state) => state.tracks.find((track) => track.id === trackId));



  const [previewItem, setPreviewItem] = useState<PreviewMediaItem | null>(null);
  const [previousDelta, setPreviousDelta] = useState(0);
  const moveMediaTimeline = useTimelineStore((state) => state.moveMediaTimeline);
  const moveMediaOrder = useTimelineStore((state) => state.moveMediaOrder);
  const zoom = useTimelineStore((state) => state.zoom);
  const setSelectedMedia = useTimelineStore((state) => state.setSelectedMedia);

  const { setNodeRef } = useDroppable({
    id: `track-${trackId}`,
  });

  if (!track) {
    return null;
  }

  function findMediaIndex(mediaId: number): number {
    return track?.items.findIndex((item) => item.id === mediaId) ?? -1;
  }

  function handleDragEnd(e: DragEndEvent) {
    setPreviousDelta(0);
    setPreviewItem(null);

    const mediaId = extractMediaId(e.active.id.toString());
    const targetId = findTargetId(e, mediaId);

    if (targetId) {
      moveMediaOrder(trackId, mediaId, parseInt(targetId, 10));
    }
  }

  function handleDragMove(event: DragMoveEvent) {
    if (!track) return;
    const deltaX = event.delta.x;
    const deltaFromPreviousCall = deltaX - previousDelta;
    if (deltaFromPreviousCall < 1 && deltaFromPreviousCall > -1) return;

    const mediaId = extractMediaId(event.active.id.toString());
    if (isNaN(mediaId)) return;

    const mediaIndex = findMediaIndex(mediaId);
    if (mediaIndex === -1) return;


    const collision = handleCollision(event, mediaId, deltaFromPreviousCall);
    if (collision) {
      setPreviewItem(collision);
      return;
    }

    setPreviewItem(null);

    moveMediaTimeline(trackId, mediaId, deltaFromPreviousCall / zoom);
    setPreviousDelta(deltaX);
  }

  function handleDragStart(e: DragStartEvent) {
    const mediaId = extractMediaId(e.active.id.toString());
    if (isNaN(mediaId)) return;
    setSelectedMedia([trackId, mediaId]);
  }

  return (
    <DndContext
      id={useId()}
      modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <ul ref={setNodeRef} className='relative bg-secondary-grey flex-1 w-full min-h-12'>
        {track.items.map((item) => (
          <Media key={item.id} trackId={trackId} mediaId={item.id} displayPreview={previewItem?.mediaId === item.id && previewItem.state || "none"} />
        ))}
      </ul>
    </DndContext>
  )
}

export default Track

