import { createContext, useContext } from "react";

export type VideoPlayerContextType = {
  isPlaying: boolean;
  url: string;
  currentTime: number;
};

export const VideoPlayerContext = createContext<VideoPlayerContextType | undefined>(undefined);

export const useVideoPlayer = () => {
  const context = useContext(VideoPlayerContext);
  if (context === undefined) {
    throw new Error('useVideoPlayer must be used within a VideoPlayerProvider');
  }
  return context;
}
