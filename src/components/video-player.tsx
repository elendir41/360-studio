"use client";

import { OrbitControls, useTexture, useVideoTexture } from '@react-three/drei';
import { useEffect } from 'react';
import { DoubleSide, RepeatWrapping } from 'three';
import { useVideoPlayer } from '~/context/video-player-context';

type VideoPlayerProps = {
}

const VideoPlayer = ({ }: VideoPlayerProps) => {
  const { isPlaying, url, currentTime } = useVideoPlayer();

  const texture = useVideoTexture(url, { start: false, loop: false });
  texture.repeat.x = -1;
  texture.wrapS = RepeatWrapping;

  const infoTexture = useTexture('/info-icon.png');

  useEffect(() => {
    if (isPlaying) {
      texture.image.play();
    } else {
      texture.image.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    texture.image.currentTime = currentTime;
  }, [currentTime]);

  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls  />
      <mesh>
        <sphereGeometry args={[50, 32, 32]} />
        <meshStandardMaterial map={texture} color={'white'} side={DoubleSide} />
      </mesh>
      <sprite position={[47, 10, 0]} scale={5}>
        <spriteMaterial attach="material" map={infoTexture} />
      </sprite>
    </>
  )
}

export default VideoPlayer
