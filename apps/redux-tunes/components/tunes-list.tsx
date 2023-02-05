import { Tune } from '@prisma/client';
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

interface TunesListProps {
  tunes: Tune[];
  onDelete: (tuneId: string) => void;
  onSelectTune: (tune: Tune) => void;
}

export function TunesList({ tunes, onDelete, onSelectTune }: TunesListProps) {
  return (
    <div className="p-4 bg-white rounded-md">
      {!tunes.length && 'No Tunes. Create One!'}
      <ul className="max-w-md divide-y divide-gray-700">
        {tunes?.map((tune) => (
          <ListItem
            key={tune.id}
            tune={tune}
            onDelete={onDelete}
            onSelectTune={onSelectTune}
          />
        ))}
      </ul>
    </div>
  );
}

function ListItem({
  tune,
  onDelete,
  onSelectTune,
}: Partial<TunesListProps> & { tune: Tune }) {
  const { push } = useRouter();

  const handleSelect = () => onSelectTune(tune);
  const handleNavigate = (e) => {
    e.stopPropagation();
    push(`/Tune/${tune.id}`);
  };

  return (
    <li key={tune.id} className="p-3" onClick={handleSelect}>
      <div className="rounded-md">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Avatar>
              <AvatarImage src={tune.image} alt="" />
              <AvatarFallback>TM</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {tune.name}
            </p>
            <p className="text-sm text-gray-500 truncate">{tune.length}</p>
          </div>
          <div className="inline-flex items-center space-x-2 text-base font-semibold text-gray-900">
            <DeleteDialog tune={tune} onDelete={onDelete} />
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
  tune,
}: Partial<TunesListProps> & { tune: Tune }) {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(tune.id);
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
            &ldquo;{tune.name}&rdquo; will be permanently removed.
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
