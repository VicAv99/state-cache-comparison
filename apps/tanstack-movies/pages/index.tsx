import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { MovieForm } from '../components/movies-form';
import { MoviesList } from '../components/movies-list';
import { RouterInputs, trpc } from '../utils/trpc';

export const defaultValues = {
  title: '',
  overview: '',
  releaseDate: null,
  image: '',
};

export function Index() {
  const queryClient = useQueryClient();
  const methods = useForm({ defaultValues });
  const { data: movies } = trpc.movies.all.useQuery();
  const { mutateAsync: createMovie } = trpc.movies.create.useMutation();
  const { mutateAsync: updateMovie } = trpc.movies.update.useMutation();
  const { mutateAsync: deleteMovie } = trpc.movies.delete.useMutation();

  const invalidateMovies = () =>
    queryClient.invalidateQueries({
      queryKey: [['movies']],
    });

  const onCreateMovie = async (movie: RouterInputs['movies']['create']) => {
    await createMovie(movie, {
      onSuccess: invalidateMovies,
    });
  };

  const onUpdateMovie = async (movie: RouterInputs['movies']['update']) => {
    await updateMovie(movie, {
      onSuccess: invalidateMovies,
    });
  };

  const onDeleteMovie = async (movieId: string) => {
    await deleteMovie(
      { movieId },
      {
        onSuccess: invalidateMovies,
      }
    );
  };

  if (!movies) {
    return <div>Loading...</div>;
  }

  return (
    <FormProvider {...methods}>
      <div className="grid grid-cols-2 gap-3">
        <MoviesList movies={movies} onDelete={onDeleteMovie} />
        <MovieForm onCreate={onCreateMovie} onUpdate={onUpdateMovie} />
      </div>
    </FormProvider>
  );
}

export default Index;
