import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

const CODE_RE = /^[A-Za-z0-9]{6,8}$/;

function isValidUrl(s: string) {
  try { new URL(s); return true; } catch { return false; }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(">>> API IS USING DATABASE URL:", process.env.DATABASE_URL);
  if (req.method === 'POST') {
    const { targetUrl, code } = req.body ?? {};
    if (!targetUrl || !isValidUrl(targetUrl)) {
      return res.status(400).json({ error: 'Invalid targetUrl' });
    }
    if (code && !CODE_RE.test(code)) {
      return res.status(400).json({ error: 'Invalid code format' });
    }
    try {
      const finalCode = code ?? Math.random().toString(36).slice(2, 8);
      const link = await prisma.link.create({
        data: {
          code: finalCode,
          targetUrl
        }
      });
      return res.status(201).json(link);
    } catch (err: any) {
      // Prisma unique constraint error code is P2002
      if (err?.code === 'P2002') {
        return res.status(409).json({ error: 'Code already exists' });
      }
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'GET') {
    const links = await prisma.link.findMany({ orderBy: { createdAt: 'desc' } });
    return res.status(200).json(links);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
