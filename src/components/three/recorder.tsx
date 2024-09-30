import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CubemapToEquirectangular }  from '~/utils/cubemap-to-equirectangular';

const Recorder = forwardRef((_, ref) => {
  const { gl, scene, camera } = useThree();
  // const cubeRenderTargetRef = useRef<THREE.WebGLCubeRenderTarget>();
  // const cubeCameraRef = useRef<THREE.CubeCamera>();
  const equiConverterRef = useRef<CubemapToEquirectangular>();

  const handleUpdate = () => {
    if (equiConverterRef.current) {
      equiConverterRef.current.update(camera, scene);
    }
  }

  useFrame(() => {
    handleUpdate();
  });
  
  useEffect(() => {
    console.log('Recorder useEffect');
    // const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024, {
    //   format: THREE.RGBFormat,
    //   generateMipmaps: true,
    //   minFilter: THREE.LinearMipmapLinearFilter,
    // });
    // cubeRenderTargetRef.current = cubeRenderTarget;
    // const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
    // cubeCamera.rotateY(Math.PI);
    // cubeCameraRef.current = cubeCamera;
    const equiConverter = new CubemapToEquirectangular(gl, true);
    equiConverterRef.current = equiConverter;
    
    // return () => {
    //   cubeRenderTarget.dispose();
    // };
  }, [gl]);

  useImperativeHandle(ref, () => ({
    takeScreenShot() {
      console.log('takeScreenShot');
      const equiConverter = equiConverterRef.current;
      if (!equiConverter) return;
      // const cubeCamera = cubeCameraRef.current;
      // if (!cubeCamera) return;

      // cubeCamera.update(gl, scene);
      if (equiConverter) {
        equiConverter.startDownload();
      }
      // gl.render(scene, camera);
    },

    endRecording() {
      console.log('endRecording');
      const equiConverter = equiConverterRef.current;
      if (!equiConverter) return;
      equiConverter.endDownload();
    },
  }));


  return null;
});

export default Recorder;
