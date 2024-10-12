import { useEffect } from "react";
import useVideoPlayerStore from "~/store/video-player-store"
import addToast from "~/utils/add-toast";

export default function useExportSubscriber() {
  const status = useVideoPlayerStore((state) => state.storeStatus);

  useEffect(() => {
    if (status) {
      addToast({...status});
    }
  }, [status]);
}

