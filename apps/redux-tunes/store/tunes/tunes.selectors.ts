import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '..';
import { selectTunes } from './tunes.reducer';

const selectTunesFeature = (state: AppState) => state.tunes;

export const selectAllTunes = createSelector(selectTunesFeature, selectTunes);
