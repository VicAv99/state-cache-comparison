import { z } from 'zod';

export const idSchema = z.object({
  id: z.string(),
});

export const movieSchema = z.object({
  id: z.string(),
  title: z
    .string({
      required_error: 'Title is Required',
    })
    .min(2, { message: 'Title is Required' }),
  overview: z.string().min(10),
  releaseDate: z.string(),
  image: z.string(),
});
