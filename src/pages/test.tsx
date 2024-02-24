import { Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";

const T = () => {
  const { data: session, status } = useSession();
  console.log(session);
  const getRes = async () => {
    const res = await fetch("http://localhost:3000/api/hello");
    const json = await res.json();
    console.log(json[0].works);
  };
  getRes();
  if (status === "authenticated") {
    return (
      <>
        <p>Signed in as {session?.user?.email}</p>
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }

  return <Button href="/api/auth/signin">Sign in</Button>;
};

export default T;
