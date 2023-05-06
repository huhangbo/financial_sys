import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/management/detail');
  // return <Button>12313</Button>
}
