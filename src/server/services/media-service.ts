import { db } from "../lib/supabase";
import * as schema from '~/server/schema';
import { MediaRequest } from "../presentation/media-request";

export const createMediaService = async (media: MediaRequest) => {
  const inserted = await db
    .insert(schema.medias)
    .values({
      ...media,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // entityId: user.entityId!,
    })
    .returning();

  const insertedMedia = inserted[0];
  if (!insertedMedia) {
    throw new Error('Failed to create media');
  }
  return insertedMedia;
};
