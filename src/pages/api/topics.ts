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
  if (!session?.user?.email) {
    return res.status(401).end(`Unauthorized`);
  }

  if (req.method === 'POST') {
    try {
      const { topic } = req.body;
      const createdTopic = await prisma.topic.create({
        data: {
          userEmail: session?.user?.email,
          topic: topic,
          bits: {
            create: [],
          },
        },
      });

      res.status(200).json(createdTopic);
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({
        error: 'Error creating topic and bit',
        details: error,
      });
    }
  } else if (req.method === 'GET') {
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
