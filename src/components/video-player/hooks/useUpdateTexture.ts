import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import useVideoPlayerStore from "~/store/video-player-store";

const useUpdateTexture = () => {
  const canvasRef = useVideoPlayerStore((state) => state.canvasRef);
  const texture = useVideoPlayerStore((state) => state.texture);
  const setTexture = useVideoPlayerStore((state) => state.setTexture);

  useFrame(() => {
    createTextureFromCanvas();
  });

  function createTextureFromCanvas() {
    if (!canvasRef) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (texture) {
      texture.dispose();
    }
    const newTexture = new THREE.CanvasTexture(canvas);
    setTexture(newTexture);
  }
}

export default useUpdateTexture
