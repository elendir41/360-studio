type Value = string[] | string | number | boolean | undefined | null;

interface Args {
  [key: string]: Value | Value;
}

const queryKeys = {
  media: ({ mediaId }: Args = {}) => ['medias', mediaId],
  medias: ({ search, type }: Args = {}) => ['medias', { search, type }],
} as const;

export { queryKeys };
