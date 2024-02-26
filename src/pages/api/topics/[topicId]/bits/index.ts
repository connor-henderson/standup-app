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
  const topicId = String(req.query.topicId);
  console.log(' :', req.query);

  if (req.method === 'POST') {
    try {
      const createdTopic = await prisma.bit.create({
        data: {
          topicId,
          jokes: {
            create: [{ line: '' }],
          },
        },
        include: {
          jokes: true,
        },
      });
      res.status(200).json(createdTopic);
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({
        error: 'Error creating bit',
        details: error,
      });
    }
  }
}
