Video player for equirectangular video and 3D representation

The video is displayed on a plane in a Three.js scene.
The texture of the canvas is saved every frame in the zustand video-player-store and applied to a sphere in the 3D scene.

The store handles the display of the 2D or 3D scene. One canvas is positioned absolutely outside the screen so that it remains in the DOM and can be computed without being displayed to the user.

For the recording, the video is played from the start and the 2D canvas is recorded with MediaRecorder. The generated blob is sent to the backend for export.

Component to import: `video-player-root.tsx`
