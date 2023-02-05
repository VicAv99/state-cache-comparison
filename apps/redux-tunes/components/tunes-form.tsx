import { zodResolver } from '@hookform/resolvers/zod';
import { Tune } from '@prisma/client';
import { Button, Input, Label } from '@state-cache-comparison/ui';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { tuneSchema } from '../utils/schemas';

type ValidationSchema = z.infer<typeof tuneSchema>;

export const defaultValues = {
  id: '',
  name: '',
  artist: '',
  length: null,
  image: '',
};

interface TuneFormProps {
  selectedTune?: Tune | void;
  onUpdate: (tune: Tune) => void;
  onCreate: (tune: Tune) => void;
  onCancel: () => void;
}

export function TuneForm({
  selectedTune,
  onCreate,
  onUpdate,
  onCancel,
}: TuneFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ValidationSchema>({
    defaultValues,
    reValidateMode: 'onChange',
    resolver: zodResolver(tuneSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data: Tune) => {
    if (!data) return;
    data.id ? onUpdate(data) : onCreate(data);
    reset(defaultValues);
  };

  useEffect(() => {
    if (!selectedTune) return;
    Object.entries(selectedTune).forEach(
      ([key, value]: [
        key: keyof typeof selectedTune,
        value: string | Date
      ]) => {
        setValue(key as any, value);
      }
    );
  }, [selectedTune, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white rounded-md">
      <h3>
        {selectedTune && selectedTune.id ? selectedTune?.name : 'Create A Tune'}
      </h3>
      <div className="my-3 space-y-2">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            {...register('name')}
            type="text"
            id="name"
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-xs italic text-red-500">
              {errors.name?.message}
            </p>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="artist">Artist</Label>
          <Input
            {...register('artist')}
            type="text"
            id="artist"
            placeholder="Artist"
          />
          {errors.artist && (
            <p className="text-xs italic text-red-500">
              {errors.artist?.message}
            </p>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="image">Image</Label>
          <Input
            {...register('image')}
            type="text"
            id="image"
            placeholder="Image"
          />
          {errors.image && (
            <p className="text-xs italic text-red-500">
              {errors.image?.message}
            </p>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="length">Length</Label>
          <Input
            {...register('length')}
            type="text"
            id="length"
            placeholder="Length"
          />
          {errors.length && (
            <p className="text-xs italic text-red-500">
              {errors.length?.message}
            </p>
          )}
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
          {selectedTune && selectedTune.id ? 'Update' : 'Create A Tune'}
        </Button>
      </div>
    </form>
  );
}
