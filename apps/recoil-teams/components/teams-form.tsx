import { zodResolver } from '@hookform/resolvers/zod';
import { Team } from '@prisma/client';
import { Button, Input, Label } from '@state-cache-comparison/ui';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { teamSchema } from '../utils/schemas';

type ValidationSchema = z.infer<typeof teamSchema>;

export const defaultValues = {
  id: '',
  name: '',
  state: '',
  slogan: '',
  image: '',
};

interface TeamFormProps {
  selectedTeam?: Team | void;
  onUpdate: (team: Team) => void;
  onCreate: (team: Team) => void;
  onCancel: () => void;
}

export function TeamForm({
  selectedTeam,
  onCreate,
  onUpdate,
  onCancel,
}: TeamFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ValidationSchema>({
    defaultValues,
    reValidateMode: 'onChange',
    resolver: zodResolver(teamSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data: Team) => {
    if (!data) return;
    data.id ? onUpdate(data) : onCreate(data);
    reset(defaultValues);
  };

  useEffect(() => {
    if (!selectedTeam) return;
    Object.entries(selectedTeam).forEach(
      ([key, value]: [
        key: keyof typeof selectedTeam,
        value: string | Date
      ]) => {
        setValue(key as any, value);
      }
    );
  }, [selectedTeam, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white rounded-md">
      <h3>
        {selectedTeam && selectedTeam.id ? selectedTeam?.name : 'Create A Team'}
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
          <Label htmlFor="state">State</Label>
          <Input
            {...register('state')}
            type="text"
            id="state"
            placeholder="State"
          />
          {errors.state && (
            <p className="text-xs italic text-red-500">
              {errors.state?.message}
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
          <Label htmlFor="slogan">Slogan</Label>
          <Input
            {...register('slogan')}
            type="text"
            id="slogan"
            placeholder="slogan"
          />
          {errors.slogan && (
            <p className="text-xs italic text-red-500">
              {errors.slogan?.message}
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
          {selectedTeam && selectedTeam.id ? 'Update' : 'Create A Team'}
        </Button>
      </div>
    </form>
  );
}
