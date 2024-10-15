import { z } from 'zod';
import { db } from '~/server/lib/supabase';
import getToken from '~/server/utils/get-token';
import getUser from '~/server/utils/get-user';
import * as schema from '~/server/schema';
import { NextRequest, NextResponse } from 'next/server';

const bodySchema = z.object({
  name: z.string(),
  ext: z.string().optional(),
  size: z.number().optional(),
  type: z.string().optional(),
  url: z.string().optional(),
});

/**
 * Create a media
 */
export const createMedia = async (request: NextRequest) => {
  const res = await request.json();
  const body = bodySchema.parse(res);

  const token = getToken(request);
  const user = await getUser(token);

  const inserted = await db
    .insert(schema.medias)
    .values({
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      entityId: user.entityId!,
    })
    .returning();

  const media = inserted[0];

  return NextResponse.json(media);
};
