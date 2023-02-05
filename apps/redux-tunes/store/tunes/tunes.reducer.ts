import { Tune } from '@prisma/client';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { fetchAllTunes } from './tunes.action';

interface TuneState {
  error?: string | null;
  loading: boolean;
  selectedId?: string | null;
}

const tunesAdapter = createEntityAdapter<Tune>({
  selectId: (tune) => tune.id,
});

const initialState = tunesAdapter.getInitialState<TuneState>({
  loading: false,
});

export const tunesSlice = createSlice({
  name: 'tunes',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllTunes.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(fetchAllTunes.fulfilled, (state, { payload }) => {
        return tunesAdapter.setAll({ ...state, loading: false }, payload);
      })
      .addCase(fetchAllTunes.rejected, (state, { error }) => ({
        ...state,
        loading: false,
        error: error.message ?? '',
      }));
  },
});

export const {
  selectAll: selectTunes,
  selectById: selectTuneById,
  selectEntities: selectTuneEntities,
  selectIds: selectTuneIds,
  selectTotal: selectTunesTotal,
} = tunesAdapter.getSelectors();
