import { createTRPCRouter, publicProcedure } from '../trpc';

export const moviesRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    return {
      movies: await ctx.prisma.movie.findMany(),
    };
  }),
});
