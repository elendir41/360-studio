import { bucket } from '~/server/lib/storage';
import { bucket as devBucket } from '~/server/lib/supabase';

const deleteFile = async (path: string) => {
  if (process.env.NODE_ENV === 'development') {
    await devBucket.remove([path]);
  } else {
    await bucket.file(path).delete();
  }
};

const createSignedUploadUrl = async (path: string) => {
  if (process.env.NODE_ENV === 'development') {
    const { data, error } = await devBucket.createSignedUploadUrl(path);

    if (error) {
      throw error;
    }

    return data?.signedUrl || '';
  }

  const file = bucket.file(path);

  return file.getSignedUrl({
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  });
};

const createSignedUrl = async (path: string) => {
  if (process.env.NODE_ENV === 'development') {
    const { data, error } = await devBucket.createSignedUrl(path, 60);

    if (error) {
      throw error;
    }

    return data?.signedUrl || '';
  }

  const file = bucket.file(path);

  const [signedUrl] = await file.getSignedUrl({
    version: 'v4',
    action: 'read',
    expires: Date.now() + 60 * 1000, // 1 minute
  });

  return signedUrl;
};

const getPublicUrl = (path: string) => {
  if (process.env.NODE_ENV === 'development') {
    const { data } = devBucket.getPublicUrl(path);

    return data?.publicUrl || '';
  }

  const file = bucket.file(path);

  return file.publicUrl();
};

export { deleteFile, createSignedUrl, createSignedUploadUrl, getPublicUrl };
