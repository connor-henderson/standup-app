import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'; // Added import for Link

const T = () => {
  const { data: session, status } = useSession();
  if (status === 'authenticated') {
    return (
      <>
        <p>Signed in as {session?.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
        <div>
          <Link href="/notebook">
            {' '}
            <button>Go to Notebook</button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <a href="/api/auth/signin">
      <button>Sign in</button>
    </a>
  );
};

export default T;
