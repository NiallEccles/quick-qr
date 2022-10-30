// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import { createClient } from "@supabase/supabase-js";
import { Code } from "../../interfaces/Code";

type Data = {
  data?: any;
  name?: string;
  url?: string;
  short_code?: string;
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
    const { code } = JSON.parse(req.body);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE}`,
          },
        },
      }
    );

    await supabase
      .from("codes")
      .select("*")
      .eq("short_code", code)
      .then(async (data) => {
        const d = data.data as Code[];
        await supabase
          .from("codes")
          .update({ num_scans: d[0].num_scans + 1 })
          .eq("short_code", code)
          .then(() => {
            res.status(200);
            res.json({ status: "success", url: d[0].url });
          });
      });
  }
}
