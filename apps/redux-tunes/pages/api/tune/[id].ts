import { prisma } from '@state-cache-comparison/client';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

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

export function withMethods(methods: string[], handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (!methods.includes(req.method)) {
      return res.status(405).end();
    }

    return handler(req, res);
  };
}
