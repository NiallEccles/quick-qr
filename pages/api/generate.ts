// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Data = {
  name?: string;
  url?: string;
  id?: string;
  status: string;
  user?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405);
    return;
  } else {
    const { name, url, token } = JSON.parse(req.body);

    await supabase.auth.getUser(token).then((retrievedUser) => {
      console.log(retrievedUser);
      if (retrievedUser.data.user) {
        res.status(200);
        res.json({ url, name, id: nanoid(13), status: "success", user: retrievedUser.data.user });
      } else {
        res.status(400);
        res.json({status: 'error'});
      }
    });
  }
}
