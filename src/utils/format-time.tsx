export const formatHHMMSSmm = (duration: number): string => {
  const hours = Math.floor(duration / 3600).toString().padStart(2, '0');  
  const minutes = Math.floor(duration / 60).toString().padStart(2, '0');
  const seconds = Math.floor(duration % 60).toString().padStart(2, '0');
  const milliseconds = Math.floor((duration % 1) * 100).toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

export const formatSSmm = (duration: number): string => {
  const seconds = Math.floor(duration).toString().padStart(2, '0');
  const milliseconds = Math.floor((duration % 1) * 100).toString().padStart(2, '0');

  return `${seconds}:${milliseconds}`;
}
