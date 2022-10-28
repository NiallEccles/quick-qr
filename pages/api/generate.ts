// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { nanoid } from 'nanoid'

type Data = {
  url: string,
  name: string,
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
    // console.log(JSON.stringify(req.body, null, 2));
    const {url, name} = JSON.parse(req.body);
    res.status(200).json({ url, name, id: nanoid(13)})
  }
}
