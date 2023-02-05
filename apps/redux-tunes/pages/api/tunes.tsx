import { prisma } from '@state-cache-comparison/client';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const tunes = await prisma.tune.findMany();

    return res.json({ tunes });
  }

  if (req.method === 'POST') {
    const tune = await prisma.tune.create({
      data: JSON.parse(req.body),
    });

    return res.json({ tune });
  }
}

export default withMethods(['GET', 'POST'], handler);

export function withMethods(methods: string[], handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (!methods.includes(req.method)) {
      return res.status(405).end();
    }

    return handler(req, res);
  };
}
