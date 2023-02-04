import { useQueryClient } from '@tanstack/react-query';

import { MovieForm } from '../components/movies-form';
import { MoviesList } from '../components/movies-list';
import { RouterInputs, trpc } from '../utils/trpc';

export function Index() {
  const queryClient = useQueryClient();
  const { data: movies } = trpc.movies.all.useQuery();
  const { mutateAsync: createMovie } = trpc.movies.create.useMutation();
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
    <>
      <div className="grid grid-cols-2 gap-3">
        <MoviesList movies={movies} onDelete={onDeleteMovie} />
        <MovieForm onCreate={onCreateMovie} />
      </div>
    </>
  );
}

export default Index;
