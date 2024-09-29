import * as THREE from "three";
import { useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useFBO, CubeCamera, OrbitControls } from "@react-three/drei";

// Vertex and fragment shaders
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

// Equirectangular shader material
// const EquirectMaterial = ({ map }) => {
//   return (
//     <shaderMaterial
//       args={[
//         {
//           uniforms: { map: { value: map } },
//           vertexShader,
//           fragmentShader,
//         },
//       ]}
//     />
//   );
// };

// Main 3D Scene Component
const Scene = () => {
  return (
    <>
      {/* Add some basic objects to the scene */}
      <mesh position={[-1, 0, -3]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh position={[2, 0, -5]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <ambientLight />
      <directionalLight position={[5, 5, 5]} />
    </>
  );
};

// CubeCamera component to capture the scene
const CubeCameraView = ({scene}) => {

  const { gl } = useThree();
  const cubeRenderTarget = useFBO(256, 256, { format: THREE.RGBFormat });
  const cubeCameraRef = useRef<THREE.CubeCamera>();

  useFrame(() => {
    if (!cubeCameraRef.current) return;
    // Update the CubeCamera at each frame
    cubeCameraRef.current.update(gl, scene);
  });

  useEffect(() => {
    if (!cubeRenderTarget) return;
    if (!cubeCameraRef.current) return;
    cubeCameraRef.current.renderTarget = cubeRenderTarget;
    cubeCameraRef.current.rotateY(Math.PI);
  }, [cubeRenderTarget, cubeCameraRef]);

  return (
    <>
      <CubeCamera ref={cubeCameraRef} near={0.1} far={1000} />
      <mesh>
        {/* A plane that renders the equirectangular view */}
        <planeGeometry args={[5, 5, 32, 32]} />
        {/* <EquirectMaterial map={cubeRenderTarget.texture} /> */}
        <rawShaderMaterial
          args={[
            {
              uniforms: { map: { value: cubeRenderTarget.texture } },
              vertexShader,
              fragmentShader,
            },
          ]}
        />
      </mesh>
    </>
  );
};

// Main App Component
const MainScene = () =>  {
  // Use a shared scene between both canvases
  const sceneRef = useRef(new THREE.Scene());

  useEffect(() => {
    // Populate the shared scene with objects
    const scene = sceneRef.current;
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5).normalize();
    scene.add(dirLight);
  }, []);

  return (
    <>
      {/* First Canvas: Normal 3D scene */}
      <Canvas style={{ height: '50vh' }} onCreated={({ scene }) => (sceneRef.current = scene)}>
        <OrbitControls />
        <Scene />
      </Canvas>

      {/* Second Canvas: Equirectangular projection of the same scene */}
      <Canvas style={{ height: '50vh' }}>
        <CubeCameraView scene={sceneRef.current} />
      </Canvas>
    </>
  );
};
export default MainScene;
