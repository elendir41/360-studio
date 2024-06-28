import { db } from '~/server/lib/supabase';
import * as schema from '~/server/schema';
import { and, asc, desc, eq, gt } from 'drizzle-orm';
import { z } from 'zod';
import sqlTextSearch from '~/server/utils/sql-text-search';
import { NextRequest, NextResponse } from 'next/server';
import { computePageInfo, validateCursorParams } from '~/server/utils/cursor-pagination';
import getToken from '~/server/utils/get-token';
import getUser from '~/server/utils/get-user';

const orderByColumns = {
  name: schema.medias.name,
  createdAt: schema.medias.createdAt,
  updatedAt: schema.medias.updatedAt,
} as const;

const directions = {
  asc: asc,
  desc: desc,
} as const;

const filtersSchema = z.object({
  name: z.string().optional(),
  orderBy: z.enum(['name', 'createdAt', 'updatedAt']).optional(),
  direction: z.enum(['asc', 'desc']).optional(),
});

/**
 * List all medias
 */
export const getMedias = async (request: NextRequest) => {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
  const filters = filtersSchema.parse(searchParams);
  const params = validateCursorParams(searchParams);

  const token = getToken(request);
  const user = await getUser(token);

  const isAdmin = user.roles?.admin;

  const cursor =
    params.after || params.before
      ? await db.query.medias.findFirst({ where: eq(schema.medias.id, params.after! || params.before!) })
      : null;

  const directionFn = directions[filters.direction!] || asc;
  const orderByColumn = orderByColumns[filters.orderBy!] || schema.medias.id;

  const orderBy = directionFn(orderByColumn);
  const limit = (params.after ? params.first : params.last) + 1;

  const nodes = await db.query.medias.findMany({
    orderBy,
    where: and(
      params.after || params.before
        ? gt(orderByColumn, cursor?.[filters.orderBy!] || params.after! || params.before!)
        : undefined,
      !isAdmin ? eq(schema.medias.entityId, user.entityId!) : undefined,
      filters.name ? sqlTextSearch(schema.medias.name, filters.name) : undefined
    ),
    limit,
    with: { entity: true },
  });

  const pageInfo = computePageInfo(params, nodes);

  const sliced = params.before ? nodes.slice(0, params.last) : nodes.slice(0, params.first);

  return NextResponse.json({
    edges: sliced.map((node) => ({ node })),
    pageInfo,
  });
};
