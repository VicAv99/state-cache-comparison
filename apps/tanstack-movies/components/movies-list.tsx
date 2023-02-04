import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from '@state-cache-comparison/shared/ui';
import { X } from 'lucide-react';

import { RouterOutputs } from '../utils/trpc';

interface MoviesListProps {
  movies: RouterOutputs['movies']['all'];
  onDelete: (movieId: string) => void;
}

export function MoviesList({ movies, onDelete }: MoviesListProps) {
  return (
    <div className="p-4 bg-white rounded-md">
      {!movies.length && 'No Movies. Create One!'}
      <ul className="max-w-md divide-y divide-gray-700">
        {movies?.map((movie) => (
          <li key={movie.id} className="p-3" onClick={() => onDelete(movie.id)}>
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
  );
}
