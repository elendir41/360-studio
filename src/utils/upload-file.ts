import axios from 'axios';
import request from './request';

type Args = {
  getCancel: (cancel: () => void) => void;
  file: File;
  name: string;
  onProgress: (progress: number) => void;
  type: 'media' | 'resource';
};

const uploadFile = async (args: Args) => {
  const { file, getCancel, name, onProgress, type } = args;

  const { signedUrl, publicUrl } = await request<{ publicUrl: string; signedUrl: string }>(`/api/upload-url`, {
    params: { fileName: name, type },
  });

  const cancelSource = axios.CancelToken.source();

  getCancel(() => {
    cancelSource.cancel();
  });

  await axios.put(signedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
    cancelToken: cancelSource.token,
    onUploadProgress: (progressEvent) => {
      const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 0));
      onProgress(progress);
    },
  });

  return publicUrl;
};

export default uploadFile;
