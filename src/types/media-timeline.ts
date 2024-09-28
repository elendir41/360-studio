enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  MOTION_DESIGN = 'MOTION_DESIGN',
}

type MediaTimelineProps = {
  id: number;
  type: MediaType;
  source: string;
  name: string;
  duration: number;
  originTime: number;
  startOffset: number;
  endOffset: number;
};

class MediaTimeline {
  readonly id: number;
  readonly type: MediaType;
  readonly source: string;
  readonly duration: number; //seconds
  name: string;
  originTime: number; //seconds
  startOffset: number; //seconds
  endOffset: number; //seconds 

  constructor({ id, type, source, name, duration, originTime, startOffset, endOffset }: MediaTimelineProps) {
    this.id = id;
    this.type = type;
    this.source = source;
    this.name = name;
    this.duration = duration;
    this.originTime = originTime;
    this.startOffset = startOffset;
    this.endOffset = endOffset;
  }

  get endTime() {
    return this.originTime + this.duration - this.endOffset;
  }

  get startTime() {
    return this.originTime + this.startOffset;
  }

  get displayTime() {
    return this.duration - this.endOffset - this.startOffset
  }

  get halfTime() {
    return this.startTime + this.displayTime / 2;
  }
}


export { MediaType, MediaTimeline };
