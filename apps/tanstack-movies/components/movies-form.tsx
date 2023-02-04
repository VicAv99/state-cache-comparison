import { Input, Label } from '@state-cache-comparison/shared/ui';

export function MovieForm() {
  return (
    <form className="p-4 bg-white rounded-md">
      <h3>Movies</h3>
      <div className="my-3 space-y-2">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input type="text" id="title" placeholder="Title" />
          <p className="text-sm text-slate-500"></p>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="overview">Overview</Label>
          <Input type="text" id="overview" placeholder="Overview" />
          <p className="text-sm text-slate-500"></p>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="release-date">Release Date</Label>
          <Input type="text" id="release-date" placeholder="Release Date" />
          <p className="text-sm text-slate-500"></p>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="image">Image</Label>
          <Input type="text" id="image" placeholder="Image" />
          <p className="text-sm text-slate-500"></p>
        </div>
      </div>
    </form>
  );
}
