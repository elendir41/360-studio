import { z } from "zod";

const mediaRequest = z.object({
  name: z.string(),
  ext: z.string().optional(),
  size: z.number().optional(),
  type: z.string().optional(),
  url: z.string().optional(),
});

type MediaRequest = z.infer<typeof mediaRequest>;

export { mediaRequest };
export type { MediaRequest };
