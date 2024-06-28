import { z } from 'zod';
import folders from '~/constants/folders';
import { db } from '~/server/lib/supabase';
import { eq } from 'drizzle-orm';
import * as schema from '~/server/schema';
import { deleteFile } from '~/server/utils/file';
import { NextRequest, NextResponse } from 'next/server';

const paramsSchema = z.object({ id: z.string() });

/**
 * Delete a media
 */
export const deleteMedia = async (request: NextRequest, context: { params: { id: string } }) => {
  const { id } = paramsSchema.parse(context.params);

  const media = await db.query.medias.findFirst({
    where: eq(schema.medias.id, id),
  });

  if (!media) {
    return NextResponse.json({ error: 'Media not found' }, { status: 404 });
  }

  try {
    const path = `${media.entityId}/${folders.MEDIAS}/${media.id}.${media.ext}`;

    await deleteFile(path);
  } catch (e) {}

  await db.delete(schema.medias).where(eq(schema.medias.id, id));

  return NextResponse.json({ success: true });
};
