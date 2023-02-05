import { Tune } from '@prisma/client';
import { useEffect, useState } from 'react';

import { TuneForm } from '../components/tunes-form';
import { TunesList } from '../components/tunes-list';
import { useAppDispatch, useAppSelector } from '../store';
import {
  createTune,
  deleteTune,
  fetchAllTunes,
  updateTune,
} from '../store/tunes/tunes.action';
import { selectAllTunes } from '../store/tunes/tunes.selectors';

export function Index() {
  const dispatch = useAppDispatch();
  const tunes = useAppSelector(selectAllTunes);
  const [selectedTune, setSelectedTune] = useState<Tune | void>();

  const onCreateTune = async (tune: Tune) => {
    const { id, ...newTune } = tune;
    dispatch(createTune(newTune));
    setSelectedTune(null);
  };

  const onUpdateTune = async (tune: Tune) => {
    dispatch(updateTune(tune));
    setSelectedTune(null);
  };

  const onDeleteTune = async (id: string) => {
    dispatch(deleteTune(id));
    setSelectedTune(null);
  };

  useEffect(() => {
    dispatch(fetchAllTunes());
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3">
      <TunesList
        tunes={tunes}
        onDelete={onDeleteTune}
        onSelectTune={setSelectedTune}
      />
      <TuneForm
        selectedTune={selectedTune}
        onCreate={onCreateTune}
        onUpdate={onUpdateTune}
        onCancel={setSelectedTune}
      />
    </div>
  );
}

export default Index;
