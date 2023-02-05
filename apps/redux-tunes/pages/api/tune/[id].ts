import { prisma } from '@state-cache-comparison/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMethods } from '../../../utils/api';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const tune = await prisma.tune.update({
      data: JSON.parse(req.body),
      where: { id: String(req.query.id) },
    });

    return res.json({ tune });
  }

  if (req.method === 'DELETE') {
    const tune = await prisma.tune.delete({
      where: { id: String(req.query.id) },
    });

    return res.json({ tune });
  }
}

export default withMethods(['DELETE', 'PATCH'], handler);
