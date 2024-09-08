'use client';

import { useRouter } from 'next/navigation'

export default function Landig() {
  const history = useRouter();

  // Redirigir al usuario al login
  history.push('/login');

  return (
    <main>
      {/*<h1>Landing</h1>*/}
    </main>
  );
}