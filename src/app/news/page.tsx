'use client';
import Image from 'next/image';

export default function hello() {
  return <Image src={'/news.png'} alt="news" width="1000" height="500" sizes="100vw" />;
}
