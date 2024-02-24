// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prismadb';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{ count: number }>
) {
  const count = await prisma.user.count();
  res.status(200).json({ count });
}
