import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from '@state-cache-comparison/shared/ui';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { RouterOutputs } from '../utils/trpc';

interface MoviesListProps {
  movies: RouterOutputs['movies']['all'];
  onDelete: (movieId: string) => void;
}

export function MoviesList({ movies, onDelete }: MoviesListProps) {
  const { setValue } = useFormContext();
  const [selectedMovie, setSelectedMovie] = useState<
    RouterOutputs['movies']['all'][number] | null
  >();

  useEffect(() => {
    if (!selectedMovie) return;
    Object.entries(selectedMovie).forEach(
      ([key, value]: [
        key: keyof typeof selectedMovie,
        value: string | Date
      ]) => {
        setValue(key, value);
      }
    );
  }, [selectedMovie, setValue]);

  return (
    <div className="p-4 bg-white rounded-md">
      {!movies.length && 'No Movies. Create One!'}
      <ul className="max-w-md divide-y divide-gray-700">
        {movies?.map((movie) => (
          <li
            key={movie.id}
            className="p-3"
            onClick={() => setSelectedMovie(movie)}
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
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(movie.id);
                    }}
                  >
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
