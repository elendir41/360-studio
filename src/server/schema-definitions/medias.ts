import { pgTable, text, timestamp, numeric, uuid } from 'drizzle-orm/pg-core';

/**
 * Medias
 */
export const medias = pgTable('medias', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  name: text('name').notNull(),
  ext: text('ext'),
  size: numeric('size').$type<number>(),
  type: text('type'),
  url: text('url'),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});
