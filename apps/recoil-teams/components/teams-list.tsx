import { Team } from '@prisma/client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@state-cache-comparison/ui';
import { ArrowRight, X } from 'lucide-react';
import { useRouter } from 'next/router';

interface TeamsListProps {
  teams: Team[];
  onDelete: (teamId: string) => void;
  onSelectTeam: (team: Team) => void;
}

export function TeamsList({ teams, onDelete, onSelectTeam }: TeamsListProps) {
  return (
    <div className="p-4 bg-white rounded-md">
      {!teams.length && 'No Teams. Create One!'}
      <ul className="max-w-md divide-y divide-gray-700">
        {teams?.map((team) => (
          <ListItem
            key={team.id}
            team={team}
            onDelete={onDelete}
            onSelectTeam={onSelectTeam}
          />
        ))}
      </ul>
    </div>
  );
}

function ListItem({
  team,
  onDelete,
  onSelectTeam,
}: Partial<TeamsListProps> & { team: Team }) {
  const { push } = useRouter();

  const handleSelect = () => onSelectTeam(team);
  const handleNavigate = (e) => {
    e.stopPropagation();
    push(`/Team/${team.id}`);
  };

  return (
    <li key={team.id} className="p-3" onClick={handleSelect}>
      <div className="rounded-md">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Avatar>
              <AvatarImage src={team.image} alt="" />
              <AvatarFallback>TM</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {team.name}
            </p>
            <p className="text-sm text-gray-500 truncate">{team.slogan}</p>
          </div>
          <div className="inline-flex items-center space-x-2 text-base font-semibold text-gray-900">
            <DeleteDialog team={team} onDelete={onDelete} />
            <Button type="button" variant="outline" onClick={handleNavigate}>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}

function DeleteDialog({
  onDelete,
  team,
}: Partial<TeamsListProps> & { team: Team }) {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(team.id);
  };

  return (
    <Dialog>
      <Button as={DialogTrigger}>
        <X className="w-4 h-4" />
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are You Sure?</DialogTitle>
          <DialogDescription>
            &ldquo;{team.name}&rdquo; will be permanently removed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button as={DialogClose} variant="outline">
            Cancel
          </Button>
          <Button as={DialogClose} onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
