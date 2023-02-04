import { trpc } from '../utils/trpc';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@state-cache-comparison/shared/ui';

export function Index() {
  const hello = trpc.example.hello.useQuery({ text: 'client' });

  if (!hello.data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-white rounded-md p-4">
        <ul className="max-w-md divide-y divide-gray-700">
          <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Neil Sims
                </p>
                <p className="text-sm text-gray-500 truncate">
                  email@flowbite.com
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                $320
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Index;
