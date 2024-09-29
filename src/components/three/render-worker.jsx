
import { createRoot } from '@react-three/fiber';
import { useState } from 'react';
import * as THREE from 'three';

console.log('worker loaded');

// self.onmessage = (event) => {
//   // const [isOk, setIsOk] = useState(false);

//   console.log('worker received message', event);
//   // const canvas = document.createElement('canvas').transferControlToOffscreen();
//   const canvas = event.data.canvas;
//   // const gl = canvas.getContext('webgl');
//   // const renderer = new THREE.WebGLRenderer({canvas});
//   // const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
//   // camera.position.z = 5;
//   // const scene = new THREE.Scene();

  
//   // const materials = [
//   //   new THREE.MeshBasicMaterial({ color: 'orange', side: THREE.DoubleSide}), // Face 5
//   //   new THREE.MeshBasicMaterial({ color: 'blue' , side: THREE.DoubleSide}),   // Face 0
//   //   new THREE.MeshBasicMaterial({ color: 'blue', side: THREE.DoubleSide}),  // Face 1
//   //   new THREE.MeshBasicMaterial({ color: 'blue', side: THREE.DoubleSide}),   // Face 2
//   //   new THREE.MeshBasicMaterial({ color: 'blue', side: THREE.DoubleSide}), // Face 3
//   //   new THREE.MeshBasicMaterial({ color: 'blue', side: THREE.DoubleSide}), // Face 4
//   // ];

//   // const geometry = new THREE.BoxGeometry(1, 1, 1);
//   // const cube = new THREE.Mesh(geometry, materials);

//   // scene.add(cube);

//   // function animate() {
//   //   requestAnimationFrame(animate);
//   //   renderer.render(scene, camera);
//   //   console.log('rendering');
//   // }

//   // animate();
// };

import { render } from '@react-three/offscreen'
import SecondScene from './second-scene';

render(<SecondScene />)
