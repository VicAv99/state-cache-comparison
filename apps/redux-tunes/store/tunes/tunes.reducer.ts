import { Tune } from '@prisma/client';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

interface TuneState {
  error?: string | null;
  loading: boolean;
  selectedId?: string | null;
}

const tunesAdapter = createEntityAdapter<Tune>({
  selectId: (track) => track.id,
});

const initialState = tunesAdapter.getInitialState<TuneState>({
  loading: false,
});

export const tunesSlice = createSlice({
  name: 'tunes',
  initialState,
  reducers: {},
});

export const {
  selectAll: selectTunes,
  selectById: selectTuneById,
  selectEntities: selectTuneEntities,
  selectIds: selectTuneIds,
  selectTotal: selectTunesTotal,
} = tunesAdapter.getSelectors();
