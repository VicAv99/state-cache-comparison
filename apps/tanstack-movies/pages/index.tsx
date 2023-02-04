import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Input,
  Label,
} from '@state-cache-comparison/shared/ui';
import { useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';

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
        <div className="p-4 bg-white rounded-md">
          {!movies.length && 'No Movies. Create One!'}
          <ul className="max-w-md divide-y divide-gray-700">
            {movies?.map((movie) => (
              <li
                key={movie.id}
                className="p-3"
                onClick={() => onDeleteMovie(movie.id)}
              >
                <div className="rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Avatar>
                        <AvatarImage src={movie.image} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {movie.title}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {movie.releaseDate.toDateString()}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                      <Button>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form className="p-4 bg-white rounded-md">
          <h3>Movies</h3>
          <div className="my-3 space-y-2">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input type="text" id="title" placeholder="Title" />
              <p className="text-sm text-slate-500"></p>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="overview">Overview</Label>
              <Input type="text" id="overview" placeholder="Overview" />
              <p className="text-sm text-slate-500"></p>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="release-date">Release Date</Label>
              <Input type="text" id="release-date" placeholder="Release Date" />
              <p className="text-sm text-slate-500"></p>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="image">Image</Label>
              <Input type="text" id="image" placeholder="Image" />
              <p className="text-sm text-slate-500"></p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Index;
