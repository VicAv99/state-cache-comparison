import { idSchema, movieSchema } from '../../utils/schemas';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const moviesRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.movie.findMany();
  }),
  byId: publicProcedure.input(idSchema).query(async ({ ctx, input }) => {
    return await ctx.prisma.movie.findFirst({
      where: {
        id: input.id,
      },
    });
  }),
  create: publicProcedure
    .input(movieSchema)
    .mutation(async ({ ctx, input }) => {
      const { title, overview, releaseDate, image } = input;
      return await ctx.prisma.movie.create({
        data: {
          title,
          overview,
          releaseDate,
          image,
        },
      });
    }),
  update: publicProcedure
    .input(movieSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, title, overview, releaseDate, image } = input;
      return await ctx.prisma.movie.update({
        where: {
          id,
        },
        data: {
          title,
          overview,
          releaseDate,
          image,
        },
      });
    }),
  delete: publicProcedure.input(idSchema).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.movie.delete({
      where: {
        id: input.id,
      },
    });
  }),
});
