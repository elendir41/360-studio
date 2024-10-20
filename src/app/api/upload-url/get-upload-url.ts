import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { createSignedUploadUrl, getPublicUrl } from '~/server/utils/file';

const querySchema = z.object({ fileName: z.string(), type: z.enum(['media', 'resource']) });

/**
 * Create a media
 */
export const getUploadUrl = async (request: NextRequest) => {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
  const query = querySchema.parse(searchParams);

  const path = `ORGANIZATION_ID/MEDIAS/${query.fileName}`;

  const signedUrl = await createSignedUploadUrl(path);

  const publicUrl = getPublicUrl(path);

  return NextResponse.json({ publicUrl, signedUrl });
};
