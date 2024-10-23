import { Canvas } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import VideoMesh from './video-mesh'
import InfoTexture from './info-texture'
import useVideoPlayerStore from '~/store/video-player-store'
import useTimelineStore from '~/store/timeline-store'
import useGetCurrentVideoMedia from './hooks/useGetCurrentVideoMedia'
import { Slider } from 'react-aria-components'

const TwoDCanvas = () => {
  const canvasRef = useVideoPlayerStore((state) => state.canvasRef);
  const setCanvasRef = useVideoPlayerStore((state) => state.setCanvasRef);
  const initialiseMediaRecorder = useVideoPlayerStore((state) => state.initialiseMediaRecorder);
  const ref = useRef(null);
  const currentMedia = useGetCurrentVideoMedia();

  const videoTexture = useVideoPlayerStore((state) => state.videoTexture);
  const [currentTime, setCurrentTime] = React.useState(0);

  useEffect(() => {
    if (!canvasRef || !canvasRef.current) return;
    canvasRef.current.width = 1024;
    canvasRef.current.height = 512;
  }, [canvasRef])

  useEffect(() => {
    setCanvasRef(ref);
    initialiseMediaRecorder();
  }, [setCanvasRef]);

  return (
    <div className='h-full'>
      <Canvas ref={ref} orthographic>
        <ambientLight intensity={1} />
        {/* {videoTracks.items.map((media) => ( */}
          <VideoMesh/>
        {/* ))} */}
        <InfoTexture />
      </Canvas>
    </div>
  )
}

export default TwoDCanvas
