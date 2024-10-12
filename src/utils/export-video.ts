import request from "~/utils/request";

function downloadFile(fileUrl: string, fileName: string) {
  fetch(fileUrl)
    .then(res => res.blob())
    .then(blob => {
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
}


export const exportVideo = async (videoBlob: Blob, fileName: string) => {
  const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
  const formData = new FormData();
  formData.append('video', videoBlob, fileNameWithoutExtension);
  formData.append('fileName', fileNameWithoutExtension + Date.now());

  try {
    const response: { body: any } | undefined = await request<{ body: any }>('/api/export', {
      method: 'POST',
      body: formData,
    });

    if (response.body && 'fileUrl' in response.body) {
      downloadFile(response.body.fileUrl, `${fileNameWithoutExtension}.mp4`);
    } else {
      console.error('Echec lors de l\'export de la vidéo');
      throw new Error('Echec lors de l\'export de la vidéo');
    }
  } catch (error) {
    console.error('Erreur durant l\'export de la vidéo:', error);
    throw new Error('Erreur durant l\'export de la vidéo');
  }
};
