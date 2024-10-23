import useTimelineStore from "~/store/timeline-store";

export default function useGetCurrentVideoMedia() {
  const videoTrack = useTimelineStore((state) => state.tracks[0]);
  const playhead = useTimelineStore((state) => state.playhead);

  // const getCurrentVideoMedia = () => {
    if (!videoTrack) return null;

    for (const media of videoTrack.items) {
      if (media.startTime <= playhead && media.endTime >= playhead) {
        return media;
      }
    }

    return null;
  // };
};
