export const formatPlayhead = (playhead: number): string => {
  const hours = Math.floor(playhead / 3600).toString().padStart(2, '0');  
  const minutes = Math.floor(playhead / 60).toString().padStart(2, '0');
  const seconds = Math.floor(playhead % 60).toString().padStart(2, '0');
  const milliseconds = Math.floor((playhead % 1) * 100).toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
