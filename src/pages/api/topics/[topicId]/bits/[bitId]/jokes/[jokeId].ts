import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return res.status(401).end(`Unauthorized`);
  }

  if (req.method === 'DELETE') {
    try {
      const jokeId = String(req.query.jokeId);
      console.log('jokeId :', jokeId);

      await prisma.joke.delete({
        where: {
          id: jokeId,
        },
      });
      res.status(200).end(`Joke with id ${jokeId} deleted successfully`);
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({
        error: 'Error deleting joke',
        details: error,
      });
    }
  }
}
