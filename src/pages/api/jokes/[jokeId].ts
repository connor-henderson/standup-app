import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return res.status(401).end(`Unauthorized`);
  }

  const jokeId = String(req.query.jokeId);

  if (req.method === 'DELETE') {
    try {
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
  if (req.method === 'PATCH') {
    try {
      const { line } = req.body;

      const updatedJoke = await prisma.joke.update({
        where: { id: jokeId },
        data: {
          line,
        },
      });

      res.status(200).json(updatedJoke);
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({
        error: 'Error updating joke',
        details: error,
      });
    }
  }
}
