import { useTexture } from "@react-three/drei";
import { useFrame, Vector3 } from "@react-three/fiber";
import { useState } from "react";

/**
 * Just a simple sprite with an info icon texture that follows the mouse pointer
 * It's used to test how to integrate motion design elements in the 3D scene
 */

function InfoTexture() {
  const infoTexture = useTexture('/info-icon.png');
  const [position, setPosition] = useState<Vector3>([0, -200, 0]);

  useFrame(({ pointer, viewport }) => {
    const x = (pointer.x * viewport.width) / 2
    const y = (pointer.y * viewport.height) / 2
    setPosition([x, y, 0]);
  });

  return <>
    <sprite position={position} scale={50}>
      <spriteMaterial attach="material" map={infoTexture} />
    </sprite>
  </>
}

export default InfoTexture;
