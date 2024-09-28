import { DragEndEvent, DragMoveEvent } from "@dnd-kit/core";
import PreviewMediaItem from "~/types/media-preview-item";

export function handleCollision(event: DragMoveEvent, mediaId: number, deltaFromPreviousCall: number): PreviewMediaItem | null {
  const previewEndItemId = checkCollision(event, mediaId, /media-(\d+)-second-third/, deltaFromPreviousCall > 0);
  if (previewEndItemId) {
    return { mediaId: previewEndItemId, state: 'end' };
  }
  
  const previewStartItemId = checkCollision(event, mediaId, /media-(\d+)-first-third/, deltaFromPreviousCall < 0);
  if (previewStartItemId) {
    return { mediaId: previewStartItemId, state: 'start' };
  }

  const previewContainerId = checkCollision(event, mediaId, /media-(\d+)-container/, true);
  if (previewContainerId) {
    return { mediaId: previewContainerId, state: 'none' };
  }

  return null;
}

function checkCollision(event: DragMoveEvent, mediaId: number, regex: RegExp, condition: boolean): number | null {
  const collision = event.collisions?.find(col => {
    const match = col.id.toString().match(regex);
    return match && match[1] !== mediaId.toString();
  });

  const match = collision && collision.id.toString().match(regex);
  if (match && match[1] && match[1] !== mediaId.toString() && condition) {
    return parseInt(match[1], 10);
  }
  return null;
}

function matchCollisionId(id: string, deltaX: number): RegExpMatchArray | null {
  const regex = deltaX > 0 ? /media-(\d+)-second-third/ : /media-(\d+)-first-third/;
  return id.match(regex);
}

export function findTargetId(e: DragEndEvent, currentMediaId: number): string | null {
  return e.collisions?.map(col => {
    const match = matchCollisionId(col.id.toString(), e.delta.x);
    return match ? match[1] : null;
  }).find(id => id !== null && id !== currentMediaId.toString()) || null;
}

export function extractMediaId(id: string): number {
  return parseInt(id.replace("media-", ""), 10);
}
