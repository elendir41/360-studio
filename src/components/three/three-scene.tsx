"use client";

import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import BasicScene from './basic-scene';

const ThreeScene = () => {
  // État pour gérer la vue
  const [is2DView, setIs2DView] = useState(false);

  const toggleView = () => {
    setIs2DView(!is2DView);
  };

  return (
    <>
      {/* Bouton de bascule entre vue 2D et 3D */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
        <button onClick={toggleView}>
          {is2DView ? 'Passer à la vue 3D' : 'Passer à la vue 2D'}
        </button>
      </div>
      <div className="flex-1 w-full h-full">
        <Canvas
          className='w-full h-full'
        >
          <Suspense fallback={null}>
            <BasicScene is2DView={is2DView} />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default ThreeScene;
