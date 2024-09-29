import { useFrame, useThree } from '@react-three/fiber';
import React from 'react'

import * as THREE from 'three';
const vertexShader = `
attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec2 vUv;

void main()  {
  vUv = vec2(1.0 - uv.x, uv.y);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision mediump float;

uniform samplerCube map;

varying vec2 vUv;

#define M_PI 3.1415926535897932384626433832795

void main()  {
  vec2 uv = vUv;

  float longitude = uv.x * 2.0 * M_PI - M_PI + M_PI / 2.0;
  float latitude = uv.y * M_PI;

  vec3 dir = vec3(
    -sin(longitude) * sin(latitude),
    cos(latitude),
    -cos(longitude) * sin(latitude)
  );
  normalize(dir);

  gl_FragColor = textureCube(map, dir);
}
`;

type TwoDSceneProps = {
  cubeCameraRef: THREE.CubeCamera;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const TwoDScene = ({ cubeCameraRef, canvasRef }: TwoDSceneProps) => {
  const materialRef = React.useRef<THREE.RawShaderMaterial>();
  const output = new THREE.WebGLRenderTarget(1, 1, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    wrapS: THREE.ClampToEdgeWrapping,
    wrapT: THREE.ClampToEdgeWrapping,
    format: THREE.RGBAFormat,
    type: THREE.UnsignedByteType
  });
  const { gl, scene, camera } = useThree();
  const { width, height } = useThree().viewport;
  gl.setRenderTarget(output);

  useFrame(() => {
    console.log(cubeCameraRef)
    if (!cubeCameraRef) return;
    if (!materialRef.current) return;


    materialRef.current.uniforms.map.value = cubeCameraRef.renderTarget.texture;
  
    // gl.render(scene, camera);

    const pixels = new Uint8Array(4 * width * height);
    gl.readRenderTargetPixels(output, 0, 0, width, height, pixels);

    // gl.setRenderTarget(null);
    const imageData = new ImageData(new Uint8ClampedArray(pixels), width, height);
    console.log('imageData', imageData);
    if (!canvasRef.current) return;
    console.log('getContext');
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    console.log('putImageData');
    ctx.putImageData(imageData, 0, 0);
  });


  return (
    <>
      <mesh>
        <planeGeometry args={[1, 1]} />
        <rawShaderMaterial ref={materialRef} fragmentShader={fragmentShader} vertexShader={vertexShader} side={THREE.DoubleSide} transparent uniforms={{ map: { value: null } }} />
      </mesh>
    </>
  )
}

export default TwoDScene
