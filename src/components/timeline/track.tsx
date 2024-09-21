import useTimelineStore from '~/store/timeline-store';
import Media from './media';

type TrackProps = {
  trackId: number;
}

const Track = ({ trackId }: TrackProps) => {
  const track = useTimelineStore((state) => state.tracks.find((track) => track.id === trackId));

  if (!track) {
    return null;
  }

  return (
    <ul className='flex bg-[var(--color-secondary-grey)] flex-1 w-fit'>
      {track.items.map((item) => (
        <Media key={item.id} trackId={trackId} mediaId={item.id} />
      ))}
    </ul>
  )
}

export default Track

