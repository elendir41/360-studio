import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import folders from '~/constants/folders';
import { db } from '~/server/lib/supabase';
import { medias } from '~/server/schema';
import { deleteFile } from '~/server/utils/file';

const routerParamsSchema = z.object({
  id: z.string(),
});

const bodySchema = z.object({
  ext: z.string().optional(),
  name: z.string().optional(),
  size: z.number().optional(),
  type: z.string().optional(),
  url: z.string().nullable().optional(),
});

/**
 * Update a media
 */
export const updateMedia = async (request: NextRequest, context: { params: { id: string } }) => {
  const params = routerParamsSchema.parse(context.params);
  const res = await request.json();
  const body = bodySchema.parse(res);

  const media = await db.query.medias.findFirst({
    where: eq(medias.id, params.id),
  });

  if (!media) {
    return NextResponse.json({ error: 'Media not found' }, { status: 404 });
  }

  /**
   * If the url has changed, delete the old file
   */
  if (body.url !== media.url) {
    try {
      const path = `${media.entityId}/${folders.MEDIAS}/${media.id}.${media.ext}`;

      await deleteFile(path);
    } catch (e) {
      console.error(e);
    }
  }

  const update = {
    updatedAt: new Date().toISOString(),
    ...body,
    ...(body.url === null && {
      url: null,
      size: null,
      type: null,
      ext: null,
    }),
  };

  await db.update(medias).set(update).where(eq(medias.id, params.id));

  return NextResponse.json({ success: true });
};
