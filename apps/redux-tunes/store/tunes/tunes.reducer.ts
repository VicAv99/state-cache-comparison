import { Tune } from '@prisma/client';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import {
  createTune,
  deleteTune,
  fetchAllTunes,
  updateTune,
} from './tunes.action';

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
  reducers: {
    setSelectedTune: (state, action) => ({
      ...state,
      selectedId: action.payload,
    }),
  },
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
      }))
      .addCase(deleteTune.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(deleteTune.fulfilled, (state, { payload }) => {
        return tunesAdapter.removeOne({ ...state, loading: false }, payload.id);
      })
      .addCase(deleteTune.rejected, (state, { error }) => ({
        ...state,
        loading: false,
        error: error.message ?? '',
      }))
      .addCase(updateTune.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(updateTune.fulfilled, (state, { payload }) => {
        return tunesAdapter.upsertOne({ ...state, loading: false }, payload);
      })
      .addCase(updateTune.rejected, (state, { error }) => ({
        ...state,
        loading: false,
        error: error.message ?? '',
      }))
      .addCase(createTune.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(createTune.fulfilled, (state, { payload }) => {
        return tunesAdapter.addOne({ ...state, loading: false }, payload);
      })
      .addCase(createTune.rejected, (state, { error }) => ({
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
