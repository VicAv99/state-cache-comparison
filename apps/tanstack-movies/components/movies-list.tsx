import { Movie } from '@prisma/client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@state-cache-comparison/ui';
import { ArrowRight, X } from 'lucide-react';
import { useRouter } from 'next/router';

interface MoviesListProps {
  movies: Movie[];
  onDelete: (movieId: string) => void;
  onSelectMovie: (movie: Movie) => void;
}

export function MoviesList({
  movies,
  onDelete,
  onSelectMovie,
}: MoviesListProps) {
  return (
    <div className="p-4 bg-white rounded-md">
      {!movies.length && 'No Movies. Create One!'}
      <ul className="max-w-md divide-y divide-gray-700">
        {movies?.map((movie) => (
          <ListItem
            key={movie.id}
            movie={movie}
            onDelete={onDelete}
            onSelectMovie={onSelectMovie}
          />
        ))}
      </ul>
    </div>
  );
}

function ListItem({
  movie,
  onDelete,
  onSelectMovie,
}: Partial<MoviesListProps> & { movie: Movie }) {
  const { push } = useRouter();

  const handleSelect = () => onSelectMovie(movie);
  const handleNavigate = (e) => {
    e.stopPropagation();
    push(`/movie/${movie.id}`);
  };

  return (
    <li key={movie.id} className="p-3" onClick={handleSelect}>
      <div className="rounded-md">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Avatar>
              <AvatarImage src={movie.image} alt="" />
              <AvatarFallback>TM</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {movie.title}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {movie.releaseDate}
            </p>
          </div>
          <div className="inline-flex items-center space-x-2 text-base font-semibold text-gray-900">
            <DeleteDialog movie={movie} onDelete={onDelete} />
            <Button type="button" variant="outline" onClick={handleNavigate}>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}

function DeleteDialog({
  onDelete,
  movie,
}: Partial<MoviesListProps> & { movie: Movie }) {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(movie.id);
  };

  return (
    <Dialog>
      <Button as={DialogTrigger}>
        <X className="w-4 h-4" />
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are You Sure?</DialogTitle>
          <DialogDescription>
            &ldquo;{movie.title}&rdquo; will be permanently removed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button as={DialogClose} variant="outline">
            Cancel
          </Button>
          <Button as={DialogClose} onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
