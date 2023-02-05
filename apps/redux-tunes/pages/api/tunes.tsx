import { prisma } from '@state-cache-comparison/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMethods } from '../../utils/api';

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
