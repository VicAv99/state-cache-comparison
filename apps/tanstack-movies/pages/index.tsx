import { trpc } from '../utils/trpc';

export function Index() {
  const hello = trpc.example.hello.useQuery({ text: 'client' });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data.greeting}</p>
    </div>
  );
}

export default Index;
