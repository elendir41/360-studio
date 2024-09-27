import { MediaTimeline } from "./media-timeline";

type Track = {
  id: number;
  items: MediaTimeline[];
}

type Timeline = {
  playhead: number;
  duration: number;
  tracks: Track[];
}

export type { Track, Timeline };
