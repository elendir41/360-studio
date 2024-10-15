import Timeline from '~/components/timeline/timeline';

import VideoPlayerRoot from '~/components/video-player/video-player-root';

const Page = () => {
  return (
    <main className='flex flex-col h-full'>
      <VideoPlayerRoot />
      <Timeline />
    </main>
  );
};

export default Page;
