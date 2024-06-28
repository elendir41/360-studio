import { authMiddleware } from '~/server/middleware/auth';
import { handler } from '~/server/middleware/handler';
import { deleteMedia } from './delete-media';
import { getMedia } from './get-media';
import { updateMedia } from './update-media';

export const DELETE = handler(authMiddleware, deleteMedia);

export const GET = handler(authMiddleware, getMedia);

export const POST = handler(authMiddleware, updateMedia);
