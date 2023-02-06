import { Team } from '@prisma/client';
import { useState } from 'react';

import { TeamForm } from '../components/teams-form';
import { TeamsList } from '../components/teams-list';

export function Index() {
  const [selectedTeam, setSelectedTeam] = useState<Team | void>();

  const onCreateTeam = async (team: Team) => {
    const { id, ...newTeam } = team;
    setSelectedTeam(null);
  };

  const onUpdateTeam = async (team: Team) => {
    setSelectedTeam(null);
  };

  const onDeleteTeam = async (id: string) => {
    setSelectedTeam(null);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <TeamsList
        teams={[]}
        onDelete={onDeleteTeam}
        onSelectTeam={setSelectedTeam}
      />
      <TeamForm
        selectedTeam={selectedTeam}
        onCreate={onCreateTeam}
        onUpdate={onUpdateTeam}
        onCancel={setSelectedTeam}
      />
    </div>
  );
}

export default Index;
