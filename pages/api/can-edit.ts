// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { Code } from "../../interfaces/Code";

type Data = {
  data?: any;
  name?: string;
  url?: string;
  short_code?: string;
  status: string;
  user?: any;
  row?: Code[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405);
    return;
  } else {
    const { session, code } = JSON.parse(req.body);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: { Authorization: `Bearer ${session.access_token}` },
        },
      }
    );

    await supabase.auth
      .getUser(session.access_token)
      .then(async (retrievedUser) => {
        if (retrievedUser.data.user) {
          const { data, error } = await supabase
            .from("codes")
            .select("*")
            .eq("user", retrievedUser.data.user.id);

          if (data) {
            // const foundCode = [];
            // for (let i = 0; i < data.length; i++) {
            //   const row = data[i];
            //   if (row.short_code === code) {
            //     foundCode.push(row);
            //   }
            // }
            res.status(200);
            res.json({
              data,
              status: "success",
              user: retrievedUser.data.user,
              row: data,
            });
          } else {
            res.status(400);
            res.json({ status: "error" });
          }
        } else {
          res.status(400);
          res.json({ status: "error" });
        }
      });
  }
}
