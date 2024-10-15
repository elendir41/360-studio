import { z } from 'zod';
import { db } from '~/server/lib/supabase';
// import getToken from '~/server/utils/get-token';
// import getUser from '~/server/utils/get-user';
import * as schema from '~/server/schema';
import { NextRequest, NextResponse } from 'next/server';
import { createMediaService } from '~/server/services/media-service';
import { mediaRequest } from '~/server/presentation/media-request';


/**
 * Create a media
 */
export const createMedia = async (request: NextRequest) => {
  const res = await request.json();
  const body = mediaRequest.parse(res);

  // const token = getToken(request);
  // const user = await getUser(token);

  const newMedia = await createMediaService(body);
  
  return NextResponse.json(newMedia);
};
