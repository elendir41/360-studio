import { createContext, useContext } from 'react';

export type CanvasContextType = {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const useCanvasContext = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvasContext must be used within a CanvasProvider');
  }
  return context;
}
