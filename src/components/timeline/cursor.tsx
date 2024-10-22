"use client";

import { useEffect, useState } from "react";
import useTimelineStore from "~/store/timeline-store";
import { formatHHMMSSmm } from "~/utils/format-time";

type CursorProps = {
  containerRef: React.RefObject<HTMLElement>;
};

/**
 * Cursor that follows the mouse on the timeline
 */

const Cursor = ({ containerRef }: CursorProps) => {
  const zoom = useTimelineStore((state) => state.zoom);
  const [height, setHeight] = useState(0);
  const [isHoveringParent, setIsHoveringParent] = useState(false);
  const [mouseXPosition, setMouseXPosition] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight);
    }
  }, [containerRef]);

  const handleMouseMove = (event: MouseEvent) => {
    if (!containerRef.current) {
      return;
    }
    const parentRect = containerRef.current.getBoundingClientRect();

    const isWithinXBounds =
      event.clientX >= parentRect.left && event.clientX <= parentRect.right;
    const isWithinYBounds =
      event.clientY >= parentRect.top && event.clientY <= parentRect.bottom;

    if (isWithinXBounds && isWithinYBounds) {
      setIsHoveringParent(true);
      setMouseXPosition(event.clientX - parentRect.left);
    } else {
      setIsHoveringParent(false);
    }
  };

  useEffect(() => {
    containerRef.current?.addEventListener('mousemove', handleMouseMove);

    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className='absolute w-1 left-0 -translate-x-1/2 bg-primary-turquoise top-0 z-20 pointer-events-none'
      style={{ height: `${height}px`, left: `${mouseXPosition}px`, display: isHoveringParent ? 'block' : 'none' }}
    >
      <p className="text-xs -translate-x-1/2 absolute bottom-[-1rem]">{formatHHMMSSmm(mouseXPosition / zoom)}</p>
    </div>
  )
}

export default Cursor

