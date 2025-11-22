import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query as { code: string };

  if (req.method === 'GET') {
    const link = await prisma.link.findUnique({ where: { code }});
    if (!link) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(link);
  } else if (req.method === 'DELETE') {
    const link = await prisma.link.findUnique({ where: { code }});
    if (!link) return res.status(404).json({ error: 'Not found' });
    await prisma.link.delete({ where: { code }});
    return res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
