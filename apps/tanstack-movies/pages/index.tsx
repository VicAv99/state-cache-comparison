import { useQueryClient } from '@tanstack/react-query';

import { MovieForm } from '../components/movies-form';
import { MoviesList } from '../components/movies-list';
import { trpc } from '../utils/trpc';

export function Index() {
  const queryClient = useQueryClient();
  const { data: movies } = trpc.movies.all.useQuery();
  const { mutateAsync: deleteMovie } = trpc.movies.delete.useMutation();

  const onDeleteMovie = async (movieId: string) => {
    await deleteMovie(
      { movieId },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: [['movies']],
          }),
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
        <MovieForm />
      </div>
    </>
  );
}

export default Index;
