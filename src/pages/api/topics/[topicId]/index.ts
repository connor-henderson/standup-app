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
  const id = String(req.query.topicId);
  const { topic } = req.body;

  if (req.method === 'PATCH') {
    try {
      const updatedTopic = await prisma.topic.update({
        where: { id },
        data: { topic },
      });

      res.status(200).json(updatedTopic);
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({
        error: 'Error updating topic',
        details: error,
      });
    }
  } else if (req.method === 'DELETE') {
    try {
      // 1. Delete Joke records by first finding associated Bit records for the Topic
      const bits = await prisma.bit.findMany({
        where: {
          topicId: id,
        },
        select: {
          id: true, // Only need the 'id' for deletion criteria
        },
      });
      const bitIds = bits.map((bit) => bit.id);

      // Delete Joke records associated with the Bit records
      await prisma.joke.deleteMany({
        where: {
          bitId: {
            in: bitIds, // Targeting all Jokes associated with these Bit IDs
          },
        },
      });

      // 2. Delete Bit records associated with the Topic
      await prisma.bit.deleteMany({
        where: {
          topicId: id,
        },
      });

      // 3. Delete the Topic
      await prisma.topic.delete({
        where: {
          id,
        },
      });

      res.status(200).end(`Topic with id ${id} deleted successfully`);
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({
        error: 'Error deleting topic',
        details: error,
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
