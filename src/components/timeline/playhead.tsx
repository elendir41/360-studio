"use client";

import { useEffect, useState } from "react";
import useTimelineStore from "~/store/timeline-store";

type PlayheadProps = {
  containerRef: React.RefObject<HTMLElement>;
};

const Playhead = ({ containerRef }: PlayheadProps) => {
  const playhead = useTimelineStore((state) => state.playhead);
  const zoom = useTimelineStore((state) => state.zoom);
  const leftPosition = playhead * zoom;

  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight);
    }
  }, [containerRef]);

  return (
    <div className={`absolute w-1 -translate-x-1/2 bg-red-800 top-0 z-20`}
      style={{ left: `${leftPosition}px`, height: `${height}px` }}
    />
  )
}

export default Playhead
