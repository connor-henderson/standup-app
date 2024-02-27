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

  if (req.method === 'DELETE') {
    try {
      // Delete Joke records associated with the Bit records
      await prisma.joke.deleteMany({
        where: {
          bitId,
        },
      });

      // 2. Delete Bit records associated with the Topic
      await prisma.bit.delete({
        where: {
          id: bitId,
        },
      });

      res.status(200).end(`Bit with id ${bitId} deleted successfully`);
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({
        error: 'Error deleting bit',
        details: error,
      });
    }
  }
  if (req.method === 'PATCH') {
    try {
      const { premise, context } = req.body;

      const updatedBit = await prisma.bit.update({
        where: { id: bitId },
        data: {
          premise,
          context,
        },
      });

      res.status(200).json(updatedBit);
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({
        error: 'Error updating bit',
        details: error,
      });
    }
  }
}
