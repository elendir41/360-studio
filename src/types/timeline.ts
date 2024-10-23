import { MediaTimeline, MediaType } from "./media-timeline";

type Track = {
  id: number;
  items: MediaTimeline[];
  mediaType: MediaType;
}

type Timeline = {
  playhead: number;
  duration: number;
  tracks: Track[];
}

export type { Track, Timeline };
