import { redirect } from 'next/navigation';

export default function hello() {
  redirect('/management/detail');
}
