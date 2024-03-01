import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'; // Added import for Link
import { useEffect } from 'react';

const T = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/hello');
      const data = await result.json();
      console.log(data);
    };
    fetchData();
  }, []);

  if (status === 'authenticated') {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-4">
        <p className="text-lg font-semibold">
          Signed in as{' '}
          <span className="text-blue-500">{session?.user?.email}</span>
        </p>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">
          Sign out
        </button>
        <Link
          href="/notebook"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
          Go to Notebook
        </Link>
      </div>
    );
  }

  return (
    <Link
      href="/api/auth/signin"
      className="ml-4 mt-4 inline-block px-6 py-2 text-sm font-semibold leading-6 text-center text-white uppercase transition bg-blue-500 rounded shadow ripple hover:shadow-lg hover:bg-blue-600 focus:outline-none">
      Sign in
    </Link>
  );
};

export default T;
