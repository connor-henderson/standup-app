import { signOut, useSession } from 'next-auth/react';

const T = () => {
  const { data: session, status } = useSession();
  console.log(session);
  const getRes = async () => {
    const res = await fetch('http://localhost:3000/api/hello');
    const json = await res.json();
    console.log('hello', json);
  };
  getRes();
  if (status === 'authenticated') {
    return (
      <>
        <p>Signed in as {session?.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
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
