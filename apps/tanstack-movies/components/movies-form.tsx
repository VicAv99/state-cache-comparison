import { Movie } from '@prisma/client';
import { Button, Input, Label } from '@state-cache-comparison/shared/ui';
import { useFormContext } from 'react-hook-form';

import { defaultValues } from '../pages';

interface MovieFormProps {
  onUpdate: (movie: Movie) => void;
  onCreate: (movie: Movie) => void;
}

export function MovieForm({ onCreate, onUpdate }: MovieFormProps) {
  const { register, handleSubmit, reset } = useFormContext();

  const onSubmit = (data: Movie) => {
    if (!data) return;
    data.id
      ? onUpdate({ ...data, releaseDate: new Date(data.releaseDate) })
      : onCreate({ ...data, releaseDate: new Date(data.releaseDate) });
    reset(defaultValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white rounded-md">
      <h3>Create A Movie</h3>
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
      <div className="flex justify-end space-x-1">
        <Button
          type="button"
          variant="outline"
          onClick={() => reset(defaultValues)}
        >
          Cancel
        </Button>
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
}
