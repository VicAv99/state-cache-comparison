import { z } from 'zod';

export const idSchema = z.object({
  id: z.string(),
});

export const tuneSchema = z.object({
  id: z.string(),
  name: z
    .string({
      required_error: 'Name is Required',
    })
    .min(2, { message: 'Name is Required' }),
  state: z.string(),
  slogan: z.string(),
  image: z.string(),
});
