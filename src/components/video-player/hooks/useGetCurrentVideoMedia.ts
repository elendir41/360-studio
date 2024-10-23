import useTimelineStore from "~/store/timeline-store";

/**
 * This hook returns the current video media according to the playhead
 */

export default function useGetCurrentVideoMedia() {
  const videoTrack = useTimelineStore((state) => state.tracks[0]);
  const playhead = useTimelineStore((state) => state.playhead);

  if (!videoTrack) return null;

  for (const media of videoTrack.items) {
    if (media.startTime <= playhead && media.endTime >= playhead) {
      return media;
    }
  }

  return null;
};
