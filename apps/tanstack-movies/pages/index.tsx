import { Movie } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { MovieForm } from '../components/movies-form';
import { MoviesList } from '../components/movies-list';
import { trpc } from '../utils/trpc';

export function Index() {
  const utils = trpc.useContext();
  const queryClient = useQueryClient();
  const { data: movies } = trpc.movies.all.useQuery();
  const { mutateAsync: createMovie } = trpc.movies.create.useMutation();
  const { mutateAsync: updateMovie } = trpc.movies.update.useMutation();
  const { mutateAsync: deleteMovie } = trpc.movies.delete.useMutation();
  const [selectedMovie, setSelectedMovie] = useState<Movie | void>();

  const invalidateMovies = () =>
    queryClient.invalidateQueries({
      queryKey: [['movies']],
    });

  const onCreateMovie = async (movie: Movie) => {
    setSelectedMovie(null);
    await createMovie(movie, {
      onSuccess: invalidateMovies,
    });
  };

  const onUpdateMovie = async (movie: Movie) => {
    setSelectedMovie(null);
    await updateMovie(movie, {
      onSuccess: (data) => {
        utils.movies.all.setData(undefined, (prevData) => {
          return prevData.map((prev) => (prev.id === data.id ? data : prev));
        });
      },
    });
  };

  const onDeleteMovie = async (id: string) => {
    setSelectedMovie(null);
    await deleteMovie(
      { id },
      {
        onSuccess: invalidateMovies,
      }
    );
  };

  if (!movies) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <MoviesList
          movies={movies}
          onDelete={onDeleteMovie}
          onSelectMovie={setSelectedMovie}
        />
        <MovieForm
          selectedMovie={selectedMovie}
          onCreate={onCreateMovie}
          onUpdate={onUpdateMovie}
          onCancel={setSelectedMovie}
        />
      </div>
    </>
  );
}

export default Index;
