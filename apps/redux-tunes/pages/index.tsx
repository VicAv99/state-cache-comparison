import { Tune } from '@prisma/client';
import { useState } from 'react';

import { TuneForm } from '../components/tunes-form';
import { TunesList } from '../components/tunes-list';

export function Index() {
  const [selectedTune, setSelectedTune] = useState<Tune | void>();

  const onCreateTune = async (tune: Tune) => {
    setSelectedTune(null);
  };

  const onUpdateTune = async (tune: Tune) => {
    setSelectedTune(null);
  };

  const onDeleteTune = async (id: string) => {
    setSelectedTune(null);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <TunesList
        tunes={[]}
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
