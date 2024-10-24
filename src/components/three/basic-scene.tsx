"use client";

import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import useTimelineStore from "~/store/timeline-store";

function  BasicScene() {
  const materials = [
    new THREE.MeshBasicMaterial({ color: 'red' , side: THREE.DoubleSide}),   // Face 0
    new THREE.MeshBasicMaterial({ color: 'green', side: THREE.DoubleSide}),  // Face 1
    new THREE.MeshBasicMaterial({ color: 'blue', side: THREE.DoubleSide}),   // Face 2
    new THREE.MeshBasicMaterial({ color: 'yellow', side: THREE.DoubleSide}), // Face 3
    new THREE.MeshBasicMaterial({ color: 'purple', side: THREE.DoubleSide}), // Face 4
    new THREE.MeshBasicMaterial({ color: 'orange', side: THREE.DoubleSide}), // Face 5
  ];

  const isPlaying = useTimelineStore((state) => state.isPlaying);
  const incrementPlayhead = useTimelineStore((state) => state.incrementPlayhead);
  useFrame((_, delta) => {
    if (!isPlaying) return;
    incrementPlayhead(delta);
  });

  return (
    <>
      <OrbitControls />
      <mesh material={materials}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
    </>
  );
}

export default BasicScene;
