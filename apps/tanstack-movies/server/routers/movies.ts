import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const moviesRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.movie.findMany();
  }),
  delete: publicProcedure
    .input(
      z.object({
        movieId: z.string({
          required_error: 'Movie Id is required',
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.movie.delete({
        where: {
          id: input.movieId,
        },
      });
    }),
});
