import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const moviesRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.movie.findMany();
  }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.movie.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        overview: z.string().min(10),
        releaseDate: z.date({
          required_error: 'You must add a Release Date',
        }),
        image: z.string(),
      })
    )
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
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        overview: z.string().min(10),
        releaseDate: z.date({
          required_error: 'You must add a Release Date',
        }),
        image: z.string(),
      })
    )
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
