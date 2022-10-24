// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { nanoid } from 'nanoid'

type Data = {
  url: string,
  id: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(405);
    return;
  } else {
    res.status(200).json({ url: req.body.url, id: nanoid(13)})
  }
}
