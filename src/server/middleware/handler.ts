import { isDynamicServerError } from 'next/dist/client/components/hooks-server-context';
import { NextRequest, NextResponse } from 'next/server';

type DynamicParamsType = {
  params?: { [key: string]: string };
};

export const handler =
  (...middleware: ((req: NextRequest, context: DynamicParamsType, next: any) => Promise<NextResponse>)[]) =>
  async (request: NextRequest, context: DynamicParamsType) => {
    try {
      let result: any;
      for (let i = 0; i < middleware.length; i++) {
        let nextInvoked = false;
        const next = async () => {
          nextInvoked = true;
        };
        result = await middleware[i](request, context, next);
        if (!nextInvoked) {
          break;
        }
      }
      if (result) return result;
    } catch (error: any) {
      if (isDynamicServerError(error)) {
        throw error;
      }

      console.error(error);
      return NextResponse.json(error, { status: (error && 'status' in error && error.status) || 500 });
    }
    throw new Error('Your handler or middleware must return a NextResponse!');
  };
