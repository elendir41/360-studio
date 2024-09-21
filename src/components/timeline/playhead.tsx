"use client";

import { useEffect, useRef, useState } from "react";
import useTimelineStore from "~/store/timeline-store";

type PlayheadProps = {
  containerRef: React.RefObject<HTMLElement>;
};

const Playhead = ({containerRef}: PlayheadProps) => {
  const playhead = useTimelineStore((state) => state.playhead);
  const duration = useTimelineStore((state) => state.duration);
  const percent = duration > 0 ? (playhead / duration) * 100 : 0;
  const [leftPosition, setLeftPosition] = useState("0px");
  const selfRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current && selfRef.current) {
      const containerWidth = containerRef.current.offsetWidth - selfRef.current.offsetWidth;
      const maxPercent = Math.min(percent, 100);
      setLeftPosition(`${(maxPercent / 100) * containerWidth}px`);
    }
  }, [percent]);

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight);
    }
  }, [containerRef]);

  return (
    <div ref={selfRef} className={`absolute w-1 bg-red-800 top-0 z-20`}
      style={{left: leftPosition, height: `${height}px`}}
    />
  )
}

export default Playhead
