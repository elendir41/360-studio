import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '~/server/lib/supabase';
import { medias } from '~/server/schema';

const schema = z.object({
  id: z.string(),
});

/**
 * Get a media
 */
export const getMedia = async (request: NextRequest, context: { params: { id: string } }) => {
  const { id } = schema.parse(context.params);

  const media = await db.query.medias.findFirst({
    where: eq(medias.id, id),
    with: {
      entity: true,
    },
  });

  return NextResponse.json(media);
};
