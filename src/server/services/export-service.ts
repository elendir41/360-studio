import path from 'path';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import { createSignedUrl, getPublicUrl, uploadVideo } from '../utils/file';
import { createMediaService } from './media-service';
import createError from 'http-errors';

const MAX_SIZE_FILE = 10 * 1024 * 1024; // 10MB

const saveTemporaryFile = async (fileName: string, videoFile: File) => {
  const inputFilePath = path.join(process.cwd(), 'temp', `${fileName}.webm`);
  const buffer = Buffer.from(await videoFile.arrayBuffer());
  const uint8Array = new Uint8Array(buffer);
  await fs.promises.writeFile(inputFilePath, uint8Array);
  return inputFilePath;
};

const deleteFiles = async (filePaths: string[]) => {
  for (const filePath of filePaths) {
    await fs.promises.unlink(filePath).catch(err => console.error(`Erreur lors de la suppression de ${filePath}:`, err));
  }
};


export const exportToMp4Service = async (fileName: string, videoFile: File) => {

  if (videoFile.size > MAX_SIZE_FILE) {
    throw createError.BadRequest('La vidéo est trop lourde');
  }

  const tempFilePath = await saveTemporaryFile(fileName, videoFile);
  const outputFilePath = path.join(process.cwd(), 'public', `${Date.now()}-output.mp4`);

  try {
    await new Promise((resolve, reject) => {
      ffmpeg(tempFilePath)
        .output(outputFilePath)
        .on('end', resolve)
        .on('error', (err) => reject(new Error(`Erreur lors de la conversion vidéo : ${err.message}`)))
        .run();
    });

    const fileBuffer = await fs.promises.readFile(outputFilePath);
    const storagePath = await uploadVideo(fileName, fileBuffer);

    if (!storagePath) {
      throw createError.InternalServerError('Erreur lors de l\'upload de la vidéo');
    }

    const fileSignedUrl = await createSignedUrl(storagePath);
    const filePublicUrl = getPublicUrl(storagePath);

    await createMediaService({
      name: fileName,
      type: 'video/mp4',
      url: filePublicUrl,
      ext: 'mp4',
      size: videoFile.size,
    });
    return fileSignedUrl;
  } catch (error) {
    console.error(error.message);
    throw createError.InternalServerError('Erreur lors du traitement de la vidéo');
  }
  finally {
    await deleteFiles([tempFilePath, outputFilePath]);
  }
};
