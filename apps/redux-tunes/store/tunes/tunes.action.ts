import { Tune } from '@prisma/client';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllTunes = createAsyncThunk(
  '[TUNES] Fetch All Tunes',
  async () => {
    const { tunes } = await await (await fetch('/api/tunes')).json();

    return tunes;
  }
);

export const setSelectedTune = createAction<string>('[TUNES] Select Tune');

export const createTune = createAsyncThunk(
  '[TUNES] Create Tune',
  async (tune: Partial<Tune>) => {
    return (
      await await (
        await fetch(`/api/tunes`, {
          method: 'POST',
          body: JSON.stringify(tune),
        })
      ).json()
    ).tune;
  }
);

export const updateTune = createAsyncThunk(
  '[TUNES] Update Tune',
  async (tune: Partial<Tune>) => {
    return (
      await await (
        await fetch(`/api/tune/${tune.id}`, {
          method: 'PATCH',
          body: JSON.stringify(tune),
        })
      ).json()
    ).tune;
  }
);

export const deleteTune = createAsyncThunk(
  '[TUNES] Delete Tune',
  async (id: string) => {
    const { tune } = await await (
      await fetch(`/api/tune/${id}`, {
        method: 'DELETE',
      })
    ).json();

    return tune;
  }
);
