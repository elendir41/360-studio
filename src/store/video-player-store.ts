import * as THREE from 'three';
import { create } from 'zustand';
import addToast from '~/utils/add-toast';
import { exportVideo } from '~/utils/export-video';


type VideoPlayerStore = {
  canvasRef: React.RefObject<HTMLCanvasElement> | null;
  setCanvasRef: (canvasRef: React.RefObject<HTMLCanvasElement>) => void;
  texture: THREE.CanvasTexture | null;
  setTexture: (texture: THREE.CanvasTexture | null) => void;
  videoTexture: THREE.VideoTexture | null;
  setVideoTexture: (videTexture: THREE.VideoTexture | null) => void;
  recording: boolean;
  toggleRecording: () => void;
  mediaRecorder: MediaRecorder | null;
  chunks: Blob[];
  initialiseMediaRecorder: () => void;
  startMediaRecorder: () => void;
  stopMediaRecorder: () => void;
  display2DCanvas: boolean;
  setDisplay2DCanvas: (display: boolean) => void;
  storeStatus: {type: 'error' | 'success' | 'info' | 'warning', title: string, content: string} | null;
}

const useVideoPlayerStore = create<VideoPlayerStore>((set) => ({
  canvasRef: null,
  texture: null,
  videoTexture: null,
  recording: false,
  mediaRecorder: null,
  chunks: [],
  display2DCanvas: true,
  storeStatus: null,
  setDisplay2DCanvas: (display) => set(() => ({ display2DCanvas: display })),
  toggleRecording: () => set((state) => ({ recording: !state.recording })),
  setCanvasRef: (newCanvasRef) => set((state) => {
    return { canvasRef: newCanvasRef };
  }),
  setTexture: (newTexture) => set((state) => {
    if (state.texture) {
      state.texture.dispose();
    }
    return { texture: newTexture };
  }),
  setVideoTexture: (newVideoTexture) => set((state) => {
    if (state.videoTexture) {
      state.videoTexture.dispose();
    }

    return { videoTexture: newVideoTexture };
  }),
  initialiseMediaRecorder: () => set((state) => {
    if (!state.canvasRef || !state.canvasRef.current)
      return state;
    if (state.mediaRecorder)
      return state;
    const mediaRecorder = new MediaRecorder(state.canvasRef.current.captureStream());
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        state.chunks.push(e.data);
      }
    };

    mediaRecorder.onstop = async () => {
      set({ storeStatus: { type: 'info', title: 'Export', content: 'Export de la vidéo...' } });

      const blob = new Blob(state.chunks, { type: 'video/webm' });
      try {
        await exportVideo(blob, 'video.webm');
        set({ storeStatus: { type: 'success', title: 'Export', content: 'Export de la vidéo réussi' } });
      } catch (error) {
        set({ storeStatus: { type: 'error', title: 'Export', content: error.message } });
      }
    };
    return { mediaRecorder };
  }),
  startMediaRecorder: () => set((state) => {
    if (state.mediaRecorder) {
      state.mediaRecorder.start(1000);
      return { recording: true, chunks: [], storeStatus: {title: 'Enregistrement', type: 'info', content: 'Enregistrement de la vidéo...' }};
    }
    return state;
  }),
  stopMediaRecorder: () => set((state) => {
    if (state.mediaRecorder) {
      state.mediaRecorder.stop();
      return { recording: false, storeStatus: {title: 'Enregistrement', type: 'info',  content: 'Fin de l\'enregistrement de la vidéo'}};
    }
    return state;
  }),

}))

export default useVideoPlayerStore;
