"use client";

import { OrbitControls } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import { useEffect, useMemo } from 'react';
import useTimelineStore from "~/store/timeline-store";
import testImage from '~/public/file-ext/2024_Predator_option_02_3840x2400.jpg';

function BasicScene({ is2DView }: { is2DView: boolean }) {
  const imageTexture = useLoader(THREE.TextureLoader, testImage.src);
  
  // Accéder à la caméra et à la taille de l'écran
  const { camera, size } = useThree();

  const aspectRatio = useMemo(() => {
    if (imageTexture) {
      return imageTexture.image.width / imageTexture.image.height;
    }
    return 1; // Ratio par défaut si l'image n'est pas encore chargée
  }, [imageTexture]);

  const planeSize = useMemo(() => {
    const screenAspectRatio = size.width / size.height;

    if (screenAspectRatio > aspectRatio) {
      return { width: size.height * aspectRatio, height: size.height };
    } else {
      return { width: size.width, height: size.width / aspectRatio };
    }
  }, [size, aspectRatio]);

  useEffect(() => {
    if (is2DView) {
      // Vue 2D
      camera.position.set(0, 0, 10);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    } else {
      // Vue 3D
      camera.position.set(-0.1, 0, 0);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }
  }, [is2DView, camera]);

  const materials = [
    new THREE.MeshBasicMaterial({ color: 'red', side: THREE.DoubleSide }),   // Face 0
    new THREE.MeshBasicMaterial({ color: 'green', side: THREE.DoubleSide }), // Face 1
    new THREE.MeshBasicMaterial({ map: imageTexture, side: THREE.DoubleSide }),  // Face 2 TEST
    new THREE.MeshBasicMaterial({ color: 'yellow', side: THREE.DoubleSide }), // Face 3
    new THREE.MeshBasicMaterial({ color: 'purple', side: THREE.DoubleSide }), // Face 4
    new THREE.MeshBasicMaterial({ color: 'orange', side: THREE.DoubleSide }), // Face 5
  ];

  const isPlaying = useTimelineStore((state) => state.isPlaying);
  const incrementPlayhead = useTimelineStore((state) => state.incrementPlayhead);

  useFrame((_, delta) => {
    if (!isPlaying) return;
    incrementPlayhead(delta);
  });

  return (
    <>
      {is2DView ? (
        // Vue 2D
        <>
          <color attach="background" args={["#000000"]} />
          <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <planeGeometry args={[planeSize.width, planeSize.height]} />
            <meshBasicMaterial map={imageTexture} />
          </mesh>
        </>
      ) : (
        // Vue 3D
        <>
          <OrbitControls />
          <mesh material={materials}>
            <boxGeometry args={[1, 1, 1]} />
          </mesh>
        </>
      )}
    </>
  );
}

export default BasicScene;
