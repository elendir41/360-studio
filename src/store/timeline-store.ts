import { create } from "zustand";
import { Track } from "~/types/timeline";
import { MediaTimeline, MediaType } from "~/types/media-timeline";

type TimelineStore = {
  playhead: number;
  duration: number;
  tracks: Track[];
  isPlaying: boolean;

  setPlayhead: (playhead: number) => void;
  incrementPlayhead: (increment: number) => void;
  setDuration: (duration: number) => void;
  addMediaTimeline: (trackId: number, media: MediaTimeline) => void;
  removeMediaTimeline: (trackId: number, mediaId: number) => void;
  updateMediaTimeline: (trackId: number, mediaId: number, media: MediaTimeline) => void;

  play: () => void;
  pause: () => void;
};

const useTimelineStore = create<TimelineStore>((set) => ({
  playhead: 0,
  duration: 20,
  tracks: [{
    id: 1, items: [
      {
        id: 1,
        type: MediaType.IMAGE,
        source: 'https://via.placeholder.com/150',
        name: 'Image 1',
        duration: 10,
        startTime: 0,
        endTime: 10,
        startOffset: 0,
        endOffset: 0,
      },
      // {
      //   id: 2,
      //   type: MediaType.VIDEO,
      //   source: 'https://www.w3schools.com/html/mov_bbb.mp4',
      //   name: 'Video 1',
      //   duration: 10,
      //   startTime: 10,
      //   endTime: 20,
      //   startOffset: 0,
      //   endOffset: 0,
      // },
    ]
  }, {
    id: 2, items: [
      {
        id: 3,
        type: MediaType.AUDIO,
        source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        name: 'Audio 1',
        duration: 10,
        startTime: 0,
        endTime: 10,
        startOffset: 0,
        endOffset: 0,
      },
      {
        id: 4,
        type: MediaType.MOTION_DESIGN,
        source: 'https://www.w3schools.com/html/mov_bbb.mp4',
        name: 'Motion Design 1',
        duration: 10,
        startTime: 10,
        endTime: 20,
        startOffset: 0,
        endOffset: 0,
      },
    ]
  }],
  isPlaying: false,

  setPlayhead: (playhead) => set({ playhead }),
  incrementPlayhead: (increment) => set((state) => {
    if (state.playhead + increment < state.duration) {
      return { playhead: state.playhead + increment };
    }
    return { playhead: state.duration, isPlaying: false };
  }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),

  setDuration: (duration) => set({ duration }),

  addMediaTimeline: (trackId, media) => set((state) => {
    const track = state.tracks.find((track) => track.id === trackId);
    if (track) {
      track.items.push(media);
    }
    return { tracks: [...state.tracks] };
  }),
  removeMediaTimeline: (trackId, mediaId) => set((state) => {
    const track = state.tracks.find((track) => track.id === trackId);
    if (track) {
      track.items = track.items.filter((item) => item.id !== mediaId);
    }
    return { tracks: [...state.tracks] };
  }),

  updateMediaTimeline: (trackId, mediaId, media) => set((state) => {
    const track = state.tracks.find((track) => track.id === trackId);
    if (track) {
      const mediaIndex = track.items.findIndex((item) => item.id === mediaId);
      if (mediaIndex !== -1) {
        track.items[mediaIndex] = media;
      }
    }
    return { tracks: [...state.tracks] };
  }),
}));

export default useTimelineStore;
