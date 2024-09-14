"use client";

import { useEffect, useRef, useState } from 'react'
import { VideoPlayerContext } from '~/context/video-player-context';

type VideoPlayerProviderProps = {
  children: React.ReactNode;
  src: string;
}

const VideoPlayerProvider = ({ children, src }: VideoPlayerProviderProps) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [url, setUrl] = useState(src);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Space':
          if (isPlaying) {
            setIsPlaying(false);
          } else {
            setIsPlaying(true);
          }
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  }, [audioRef]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current?.currentTime || 0);
    };

    const audio = audioRef.current;
    audio?.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <>
      <VideoPlayerContext.Provider
        value={{
          isPlaying,
          url,
          currentTime
        }}
      >
        <div className='h-full flex flex-col gap-12'>
        {children}

        <div>

          <audio ref={audioRef} src={url} controls />
          <input
            type="range" step={0.01}
            min={0} max={duration} value={currentTime}
            onChange={handleSliderChange}
          />
          <div>
            Time: {currentTime.toFixed(2)} / {duration.toFixed(2)}
          </div>
        </div>
        </div>
      </VideoPlayerContext.Provider>
    </>
  )
}

export default VideoPlayerProvider

