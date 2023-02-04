import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { MovieForm } from '../components/movies-form';
import { MoviesList } from '../components/movies-list';
import { RouterInputs, RouterOutputs, trpc } from '../utils/trpc';

export function Index() {
  const utils = trpc.useContext();
  const queryClient = useQueryClient();
  const { data: movies } = trpc.movies.all.useQuery();
  const { mutateAsync: createMovie } = trpc.movies.create.useMutation();
  const { mutateAsync: updateMovie } = trpc.movies.update.useMutation();
  const { mutateAsync: deleteMovie } = trpc.movies.delete.useMutation();
  const [selectedMovie, setSelectedMovie] = useState<
    RouterOutputs['movies']['all'][number] | void
  >();

  const invalidateMovies = () =>
    queryClient.invalidateQueries({
      queryKey: [['movies']],
    });

  const onCreateMovie = async (movie: RouterInputs['movies']['create']) => {
    setSelectedMovie(null);
    await createMovie(movie, {
      onSuccess: invalidateMovies,
    });
  };

  const onUpdateMovie = async (movie: RouterInputs['movies']['update']) => {
    setSelectedMovie(null);
    await updateMovie(movie, {
      onSuccess: (data) => {
        utils.movies.all.setData(undefined, (prevData) => {
          return prevData.map((prev) => (prev.id === data.id ? data : o));
        });
      },
    });
  };

  const onDeleteMovie = async (movieId: string) => {
    setSelectedMovie(null);
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
