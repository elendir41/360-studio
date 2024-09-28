import { create } from "zustand";
import { Track } from "~/types/timeline";
import { MediaTimeline, MediaType } from "~/types/media-timeline";
import addToast from "~/utils/add-toast";

const MIN_MEDIA_DURATION = 1;

type TimelineStore = {
  playhead: number;
  duration: number;
  tracks: Track[];
  isPlaying: boolean;
  zoom: number;
  selectedMedia: [number, number] | null;
  canCutMedia: boolean;

  setZoom: (zoom: number) => void;
  incrementZoom: (increment: number) => void;
  setPlayhead: (playhead: number) => void;
  incrementPlayhead: (increment: number) => void;
  setDuration: (duration: number) => void;
  addMediaTimeline: (trackId: number, media: MediaTimeline) => void;
  removeMediaTimeline: (trackId: number, mediaId: number) => void;

  moveMediaTimeline: (trackId: number, mediaId: number, delta: number) => void;
  resizeMediaStart: (trackId: number, mediaId: number, delta: number) => void;
  resizeMediaEnd: (trackId: number, mediaId: number, delta: number) => void;
  moveMediaOrder: (trackId: number, mediaId: number, targetMediaId: number) => void;

  setSelectedMedia: (mediaId: [number, number]) => void;
  cutMedia: () => void;

  play: () => void;
  pause: () => void;
};

const useTimelineStore = create<TimelineStore>((set) => ({
  playhead: 0,
  duration: 30,
  zoom: 100,
  tracks: [{
    id: 1, items: [
      new MediaTimeline({
        id: 1,
        type: MediaType.IMAGE,
        source: 'https://via.placeholder.com/150',
        name: 'Image 1',
        duration: 10,
        originTime: 0,
        startOffset: 0,
        endOffset: 0,
      }),
      // new MediaTimeline({
      //   id: 2,
      //   type: MediaType.VIDEO,
      //   source: 'https://www.w3schools.com/html/mov_bbb.mp4',
      //   name: 'Video 1',
      //   duration: 10,
      //   startTime: 10,
      //   startOffset: 0,
      //   endOffset: 0,
      // }),
    ]
  }, {
    id: 2, items: [
      new MediaTimeline({
        id: 3,
        type: MediaType.AUDIO,
        source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        name: 'Audio 1',
        duration: 10,
        originTime: -5,
        startOffset: 8,
        endOffset: 0,
      }),
      new MediaTimeline({
        id: 4,
        type: MediaType.MOTION_DESIGN,
        source: 'https://www.w3schools.com/html/mov_bbb.mp4',
        name: 'Motion Design 1',
        duration: 10,
        originTime: -2,
        startOffset: 8,
        endOffset: 0,
      }),
      new MediaTimeline({
        id: 5,
        type: MediaType.IMAGE,
        source: 'https://via.placeholder.com/150',
        name: 'Image 2',
        duration: 4,
        originTime: 9,
        startOffset: 0,
        endOffset: 0,
      }),
    ]
  }],
  isPlaying: false,
  selectedMedia: null,
  canCutMedia: false,

  setPlayhead: (playhead) => set((state) => {
    let canCut = false;
    state.tracks.forEach((track) => {
      track.items.forEach((item) => {
        if (item.startTime < playhead && item.endTime > playhead) {
          canCut = true;
        }
      });
    });
    return { playhead: playhead, canCutMedia: canCut };
  }),
  setZoom: (zoom) => set({ zoom }),
  incrementZoom: (increment) => set((state) => {
    if (state.zoom + increment < 50) {
      return { zoom: 50 };
    }
    return { zoom: state.zoom + increment }
  }),
  incrementPlayhead: (increment) => set((state) => {
    if (state.playhead + increment < state.duration) {
      return { playhead: state.playhead + increment };
    }
    return { playhead: state.duration, isPlaying: false };
  }),
  play: () => set({ isPlaying: true, canCutMedia: false }),
  pause: () => set({ isPlaying: false }),

  setDuration: (duration) => set({ duration }),

  addMediaTimeline: (trackId, media) => set((state) => {
    const track = state.tracks.find((track) => track.id === trackId);
    if (track) {
      const index = track.items.findIndex(item => item.startTime > media.startTime);
      if (index === -1) {
        track.items.push(media);
      } else {
        track.items.splice(index, 0, media);
      }
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

  moveMediaTimeline: (trackId, mediaId, delta) => set((state) => {
    const track = state.tracks.find((track) => track.id === trackId);
    if (!track) {
      return state;
    }
    const mediaIndex = track.items.findIndex((item) => item.id === mediaId);
    if (mediaIndex === -1) {
      return state;
    }
    const media = track.items[mediaIndex];
    let newOriginTime = media.originTime + delta;
    newOriginTime = parseFloat(newOriginTime.toFixed(3));

    track.items[mediaIndex] = new MediaTimeline({ ...media, originTime: newOriginTime });
    return { tracks: [...state.tracks] };
  }),
  resizeMediaStart: (trackId, mediaId, delta) => set((state) => {
    const track = state.tracks.find((track) => track.id === trackId);
    if (!track) {
      return state;
    }
    const mediaIndex = track.items.findIndex((item) => item.id === mediaId);
    if (mediaIndex === -1) {
      return state;
    }
    const media = track.items[mediaIndex];

    let newStartOffset = media.startOffset + delta;

    const isFirst = mediaIndex === 0;
    const isBeforeTimelineStart = media.originTime + newStartOffset < 0;
    if (isFirst && isBeforeTimelineStart) {
      return state;
    }

    if (newStartOffset < 0) {
      newStartOffset = 0;
    }
    else {
      const prevMedia = track.items[mediaIndex - 1];
      const isOverlappingPrevMedia = prevMedia && prevMedia.endTime > media.originTime + newStartOffset;
      if (isOverlappingPrevMedia) {
        newStartOffset = prevMedia.endTime - media.originTime;
      }
    }
    newStartOffset = parseFloat(newStartOffset.toFixed(3));

    track.items[mediaIndex] = new MediaTimeline({ ...media, startOffset: newStartOffset });
    return { tracks: [...state.tracks] };
  }),

  resizeMediaEnd: (trackId, mediaId, delta) => set((state) => {
    const track = state.tracks.find((track) => track.id === trackId);
    if (!track) {
      return state;
    }
    const mediaIndex = track.items.findIndex((item) => item.id === mediaId);
    if (mediaIndex === -1) {
      return state;
    }
    const media = track.items[mediaIndex];
    let newEndOffset = media.endOffset + delta;
    if (newEndOffset < 0) {
      newEndOffset = 0;
    }

    const newDisplayTime = media.displayTime + media.endOffset - newEndOffset;
    if (newDisplayTime < MIN_MEDIA_DURATION) {
      return state;
    }

    const nextMedia = track.items.find((item) => item.startTime > media.startTime);
    if (nextMedia && media.endTime + media.endOffset - newEndOffset > nextMedia.startTime) {
      newEndOffset = media.endOffset;
    }
    newEndOffset = parseFloat(newEndOffset.toFixed(3));

    track.items[mediaIndex] = new MediaTimeline({ ...media, endOffset: newEndOffset });
    return state;
  }),
  moveMediaOrder: (trackId: number, mediaId: number, targetMediaId: number) => set((state) => {
    const track = state.tracks.find((track) => track.id === trackId);
    if (!track) {
      return state;
    }
    const mediaIndex = track.items.findIndex((item) => item.id === mediaId);
    const targetMediaIndex = track.items.findIndex((item) => item.id === targetMediaId);
    if (mediaIndex === -1 || targetMediaIndex === -1) {
      return state;
    }
    const media = track.items[mediaIndex];
    const targetMedia = track.items[targetMediaIndex];
    // vers la droite
    const isMovingRight = mediaIndex < targetMediaIndex;
    if (isMovingRight) {
      const newOriginTime = targetMedia.endTime - media.startOffset;

      const isLast = mediaIndex === track.items.length - 1;
      const isBeyondTimelineDuration = newOriginTime + media.displayTime > state.duration;
      if (isLast && isBeyondTimelineDuration) {
        addToast({title: "Impossible de bouger le média", content: `${media.name} dépasse la durée de la timeline` , type: "error"});
        return state;
      }

      const overLapedMedia = track.items.find((item) => {
        const isDifferent = item.id !== mediaId && item.id !== targetMediaId;
        const endBetweenNextMedia =
          item.endTime > newOriginTime + media.startOffset + media.displayTime && 
          item.startTime < newOriginTime + media.startOffset + media.displayTime;
        const startBeforeEndAfterNextMedia =
          newOriginTime + media.startOffset <= item.startTime &&
          newOriginTime + media.startOffset + media.displayTime >= item.endTime;
        return isDifferent && (endBetweenNextMedia || startBeforeEndAfterNextMedia);
      });
      if (overLapedMedia) {
        addToast({title: "Impossible de bouger le média", content: `${media.name} dépasse sur ${overLapedMedia.name}` , type: "error"});
        return state;
      }

      media.originTime = newOriginTime;
    } else { // moving left
      const newOriginTime = targetMedia.startTime - media.displayTime - media.startOffset;
      if (mediaIndex === 1 && newOriginTime + media.startOffset < 0) {
        addToast({title: "Impossible de bouger le média", content: `${media.name} dépasse la durée de la timeline` , type: "error"});
        return state;
      }

      const overLapedMedia = track.items.find((item) => {
        const isDifferent = item.id !== mediaId && item.id !== targetMediaId;
        const startBetweenPrevMedia =
          item.endTime > newOriginTime + media.startOffset &&
          item.startTime < newOriginTime + media.startOffset;
        const startBeforeEndAfterPrevMedia =
            newOriginTime + media.startOffset <= item.startTime &&
            newOriginTime + media.startOffset + media.displayTime >= item.endTime;
        return isDifferent && (startBetweenPrevMedia || startBeforeEndAfterPrevMedia);
      });
      if (overLapedMedia) {
        addToast({title: "Impossible de bouger le média", content: `${media.name} dépasse sur ${overLapedMedia.name}` , type: "error"});
        return state;
      }

      media.originTime = newOriginTime;
    }
    track.items.sort((a, b) => a.startTime - b.startTime);
    const trackIndex = state.tracks.findIndex((track) => track.id === trackId);
    state.tracks[trackIndex] = { ...track };
    return { tracks: [...state.tracks] };
  }),

  setSelectedMedia: (selectedMedia) => set({ selectedMedia }),

  cutMedia: () => set((state) => {
    if (!state.selectedMedia) {
      return state;
    }
    const [trackId, mediaId] = state.selectedMedia;
    const track = state.tracks.find((track) => track.id === trackId);
    if (!track) {
      return state;
    }
    const mediaIndex = track.items.findIndex((item) => item.id === mediaId);
    if (mediaIndex === -1) {
      return state;
    }
    const media = track.items.find((item) => item.id === mediaId)!;
    const newMedia1 = new MediaTimeline({
      id: mediaId + 11,
      type: media.type,
      source: media.source,
      name: `${media.name} - 1`,
      duration: state.playhead - (media.originTime + media.startOffset),
      originTime: media.originTime + media.startOffset,
      startOffset: media.startOffset,
      endOffset: 0,
    });
    const newMedia2 = new MediaTimeline({
      id: mediaId + 12,
      type: media.type,
      source: media.source,
      name: `${media.name} - 2`,
      duration: media.originTime + media.duration - media.endOffset - state.playhead,
      originTime: state.playhead,
      startOffset: 0,
      endOffset: media.endOffset,
    });
    track.items = track.items.filter((item) => item.id != mediaId);
    track.items.push(newMedia1, newMedia2);
    return { tracks: [...state.tracks] };
  })
}));

export default useTimelineStore;
