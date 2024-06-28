import { authMiddleware } from '~/server/middleware/auth';
import { handler } from '~/server/middleware/handler';
import { createMedia } from './create-media';
import { getMedias } from './get-medias';

export const GET = handler(authMiddleware, getMedias);

export const POST = handler(authMiddleware, createMedia);
