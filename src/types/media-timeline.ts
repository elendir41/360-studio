enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  MOTION_DESIGN = 'MOTION_DESIGN',
}

type MediaTimeline = {
  id: number;
  type: MediaType;
  source: string;
  name: string;
  
  duration: number;
  startTime: number;
  endTime: number;
  startOffset: number;
  endOffset: number;
};

export { MediaType };
export type { MediaTimeline };
