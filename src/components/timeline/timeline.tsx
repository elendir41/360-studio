"use client";

import useTimelineStore from "~/store/timeline-store";
import Track from "./track";
import TimelineHeader from "./timeline-header";
import Playhead from "./playhead";
import { useRef } from "react";
import TimeIndicator from "./time-indicator";
import Cursor from "./cursor";
import { MediaType } from "~/types/media-timeline";
import { MdAudiotrack, MdVideocam, MdOutlineImage } from "react-icons/md";
import { FaHighlighter } from "react-icons/fa6";

const Timeline = () => {
  const tracks = useTimelineStore((state) => state.tracks);
  const duration = useTimelineStore((state) => state.duration);
  const zoom = useTimelineStore((state) => state.zoom);
  const incrementZoom = useTimelineStore((state) => state.incrementZoom);
  const setPlayhead = useTimelineStore((state) => state.setPlayhead);

  const trackContainerRef = useRef<HTMLDivElement>(null);
  const tracksRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!trackContainerRef.current) return;
    const rect = trackContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setPlayhead(x / zoom);
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (!e.altKey || e.shiftKey) return;
    incrementZoom(e.deltaY > 0 ? -20 : 20);
  }

  return (
    <section onWheel={handleWheel} className="flex flex-col w-full pb-4
      bg-secondary-black text-secondary-white" style={{ height: '30%' }}>
      <TimelineHeader />
      <div className="flex h-screen overflow-y-scroll">
        <aside className="flex-col gap-1 pb-2 mt-2" style={{position: "sticky", left:0}}>
          <div className="h-7 mb-2 mt-1" />
          {tracks.map((track) => (
            <div key={track.id} className="mt-1 h-12 w-20 flex items-center justify-center">
              {
                (() => {
                  switch (track.mediaType) {
                    case MediaType.VIDEO:
                      return <MdVideocam />;
                    case MediaType.AUDIO:
                      return <MdAudiotrack />;
                    case MediaType.IMAGE:
                      return <MdOutlineImage />;
                    case MediaType.MOTION_DESIGN:
                      return <FaHighlighter />;
                    default:
                      return null;
                  }
                })()
              }
              <h3 className='text-center'>{track.id}</h3>
            </div>
          ))}
        </aside>
        <section ref={tracksRef} className="overflow-x-scroll timeline-scrollbar pb-2 pr-2 h-fit overflow-y-hidden">
          <div onClick={handleClick} ref={trackContainerRef} className="relative m-2 flex flex-col gap-1 h-fit w-fit" style={{width: `${duration * zoom}px`}}>
            <Playhead containerRef={trackContainerRef}/>
            <Cursor containerRef={trackContainerRef}/>
            <TimeIndicator />
            <div className="flex flex-col gap-1">
              {tracks.map((track) => (
                <Track key={track.id} trackId={track.id} mediaType={MediaType.AUDIO} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default Timeline
