"use client";

import { OrbitControls, useTexture, useVideoTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import useTimelineStore from "~/store/timeline-store";
import Recorder from "./recorder";
import { useRef } from "react";

function  SecondScene() {
  const materials = [
    new THREE.MeshBasicMaterial({ color: 'orange', side: THREE.DoubleSide}), // Face 5
    new THREE.MeshBasicMaterial({ color: 'blue' , side: THREE.DoubleSide}),   // Face 0
    new THREE.MeshBasicMaterial({ color: 'blue', side: THREE.DoubleSide}),  // Face 1
    new THREE.MeshBasicMaterial({ color: 'blue', side: THREE.DoubleSide}),   // Face 2
    new THREE.MeshBasicMaterial({ color: 'blue', side: THREE.DoubleSide}), // Face 3
    new THREE.MeshBasicMaterial({ color: 'blue', side: THREE.DoubleSide}), // Face 4
  ];

  const isPlaying = useTimelineStore((state) => state.isPlaying);
  const incrementPlayhead = useTimelineStore((state) => state.incrementPlayhead);
  useFrame((_, delta) => {
    if (!isPlaying) return;
    incrementPlayhead(delta);
  });

  const infoTexture = useTexture('/info-icon.png');
  const texture = useVideoTexture('/helico.mp4', { start: true, loop: true });
  texture.repeat.x = -1;
  texture.wrapS = THREE.RepeatWrapping;

  

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={1} />
      {/* <mesh material={materials}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh> */}
      <mesh>
        <sphereGeometry args={[50, 32, 32]} />
        <meshStandardMaterial map={texture} color={'white'} side={THREE.DoubleSide} />
      </mesh>
      <sprite position={[47, 10, 0]} scale={5}>
        <spriteMaterial attach="material" map={infoTexture} />
      </sprite>
    </>
  );
}

export default SecondScene;
