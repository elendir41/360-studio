"use client";

import React from 'react'
import CanvasProvider from './canvas-provider'
import SceneContent from './scene-content'
import useExportSubscriber from './useExportSubscriber';

const VideoPlayerRoot = () => {
  useExportSubscriber();
  
  return (
    <CanvasProvider>
      <SceneContent />
    </CanvasProvider>
  )
}

export default VideoPlayerRoot
