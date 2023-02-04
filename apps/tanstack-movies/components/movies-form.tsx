import { Movie } from '@prisma/client';
import { Button, Input, Label } from '@state-cache-comparison/shared/ui';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const defaultValues = {
  id: '',
  title: '',
  overview: '',
  releaseDate: null,
  image: '',
};

interface MovieFormProps {
  selectedMovie?: Movie | void;
  onUpdate: (movie: Movie) => void;
  onCreate: (movie: Movie) => void;
  onCancel: () => void;
}

export function MovieForm({
  selectedMovie,
  onCreate,
  onUpdate,
  onCancel,
}: MovieFormProps) {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues,
  });

  const onSubmit = (data: Movie) => {
    if (!data) return;
    data.id
      ? onUpdate({ ...data, releaseDate: new Date(data.releaseDate) })
      : onCreate({ ...data, releaseDate: new Date(data.releaseDate) });
    reset(defaultValues);
  };

  useEffect(() => {
    if (!selectedMovie) return;
    Object.entries(selectedMovie).forEach(
      ([key, value]: [
        key: keyof typeof selectedMovie,
        value: string | Date
      ]) => {
        setValue(key as any, value);
      }
    );
  }, [selectedMovie, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white rounded-md">
      <h3>
        {selectedMovie && selectedMovie.id
          ? selectedMovie?.title
          : 'Create A Movie'}
      </h3>
      <div className="my-3 space-y-2">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            {...register('title')}
            type="text"
            id="title"
            placeholder="Title"
          />
          <p className="text-sm text-slate-500"></p>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="overview">Overview</Label>
          <Input
            {...register('overview')}
            type="text"
            id="overview"
            placeholder="Overview"
          />
          <p className="text-sm text-slate-500"></p>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="release-date">Release Date</Label>
          <Input
            {...register('releaseDate')}
            type="date"
            id="release-date"
            placeholder="Release Date"
          />
          <p className="text-sm text-slate-500"></p>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="image">Image</Label>
          <Input
            {...register('image')}
            type="text"
            id="image"
            placeholder="Image"
          />
          <p className="text-sm text-slate-500"></p>
        </div>
      </div>
      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            reset(defaultValues);
            onCancel();
          }}
        >
          Cancel
        </Button>
        <Button type="submit">
          {selectedMovie && selectedMovie.id ? 'Update' : 'Create A Movie'}
        </Button>
      </div>
    </form>
  );
}
