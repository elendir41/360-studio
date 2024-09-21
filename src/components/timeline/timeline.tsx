"use client";

import useTimelineStore from "~/store/timeline-store";
import Track from "./track";
import TimelineHeader from "./timeline-header";
import Playhead from "./playhead";
import { useRef } from "react";
import TimeIndicator from "./time-indicator";

const Timeline = () => {
  const tracks = useTimelineStore((state) => state.tracks);
  const trackContainerRef = useRef(null);
  return (
    <section className="flex flex-col w-full pb-4
      bg-[var(--color-secondary-black)] text-[var(--color-secondary-white)]">
      <TimelineHeader />
      <div className="flex h-fit">
        <aside className="flex flex-col justify-evenly">
          {tracks.map((track) => (
            <h3 key={track.id} className='text-center self-center w-20'>{track.id}</h3>
          ))}
        </aside>
        <section className="overflow-x-scroll timeline-scrollbar pb-2 pr-2">
          <div ref={trackContainerRef} className="relative flex flex-col gap-1 w-fit">
            <Playhead containerRef={trackContainerRef}/>
            <TimeIndicator />
            {tracks.map((track) => (
              <Track key={track.id} trackId={track.id} />
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

export default Timeline
