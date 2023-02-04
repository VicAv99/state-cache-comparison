import { AspectRatio, Button } from '@state-cache-comparison/shared/ui';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { trpc } from '../../../utils/trpc';

export default function Movie() {
  const { query, push } = useRouter();
  const { data } = trpc.movies.byId.useQuery({ id: String(query.id) });

  if (!data) {
    return 'Loading...';
  }

  return (
    <div>
      <Button type="button" variant="outline" onClick={() => push(`/`)}>
        <ArrowLeft className="w-4 h-4" />
      </Button>
      <div className="max-w-md p-4 mx-auto bg-white rounded-md shadow -mt-9">
        <h3>
          {data.title}
          <br />
          <span className="text-sm text-gray-500">({data.releaseDate})</span>
        </h3>
        <div className="mx-auto h-1/5">
          <AspectRatio
            ratio={7 / 10}
            className="my-4 bg-slate-50 dark:bg-slate-800"
          >
            <Image
              src={data.image}
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </AspectRatio>
        </div>
        <p>{data.overview}</p>
      </div>
    </div>
  );
}
