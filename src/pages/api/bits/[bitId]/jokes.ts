import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return res.status(401).end(`Unauthorized`);
  }
  const bitId = String(req.query.bitId);

  if (req.method === 'POST') {
    try {
      // Add a new Joke record associated with the Bit record
      const newJoke = await prisma.joke.create({
        data: {
          bitId,
          line: req.body?.line,
        },
      });

      res.status(200).json(newJoke);
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({
        error: 'Error adding joke',
        details: error,
      });
    }
  }
}
