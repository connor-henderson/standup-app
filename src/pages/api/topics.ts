// pages/api/createTopicAndBit.ts

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

  if (req.method === 'POST') {
    try {
      const createdTopic = await prisma.topic.create({
        data: {
          userEmail,
          topic: req.body?.topic,
          bits: {
            create: [
              {
                jokes: {
                  create: [],
                },
              },
            ],
          },
        },
      });

      res.status(200).json(createdTopic);
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({
        error: 'Error creating topic',
        details: error,
      });
    }
  } else if (req.method === 'GET') {
    try {
      const topics = await prisma.topic.findMany({
        where: { userEmail },
        include: {
          bits: {
            include: {
              jokes: true,
            },
          },
        },
      });

      res.status(200).json(topics);
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({
        error: 'Error fetching topics',
        details: error,
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
