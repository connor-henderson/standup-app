// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Author, Prisma, Work } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";

const authorWithWorks = Prisma.validator<Prisma.AuthorArgs>()({
  include: { works: true },
});

export type AuthorWithWorks = Prisma.AuthorGetPayload<typeof authorWithWorks>;

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AuthorWithWorks[]>
) {
  const authors = await prisma.author.findMany({ include: { works: true } });
  res.status(200).json(authors);
}
