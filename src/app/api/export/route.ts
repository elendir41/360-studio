import { handler } from '~/server/middleware/handler';
import { createExport } from './create-export';
import { NextRequest } from 'next/server';


async function middleware1(req: NextRequest, context: any, next: any) {
  return await next(req);
}

export const POST = handler(middleware1, createExport);
