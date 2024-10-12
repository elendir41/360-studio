import { useRef, useState } from 'react';
import * as THREE from 'three';
import { CanvasContext } from './canvas-context';


type CanvasProviderProps = {
  children: React.ReactNode;
}

const CanvasProvider = ({ children }: CanvasProviderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <CanvasContext.Provider value={{ containerRef }}>
        {children}
      </CanvasContext.Provider>
    </>
  )
}

export default CanvasProvider
