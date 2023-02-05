import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllTunes = createAsyncThunk(
  '[TUNES] Fetch All Tunes',
  async () => {
    const { tunes } = await await (await fetch('/api/tunes')).json();

    return tunes;
  }
);
