import { medias } from '~/server/schema';

type Media = typeof medias.$inferSelect;

export type { Media };
