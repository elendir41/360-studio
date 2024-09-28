import { handler } from '~/server/middleware/handler';
import { getUploadUrl } from './get-upload-url';

export const GET = handler(getUploadUrl);
