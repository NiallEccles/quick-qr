// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

type Data = {
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
    const { name, url, session, code } = JSON.parse(req.body);

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
        console.log(retrievedUser);
        if (retrievedUser.data.user) {
          const settedSession = supabase.auth.setSession(session);
          settedSession.then((sesh) => console.log(sesh));

          const { data, error } = await supabase
            .from("codes")
            .select("*")
            .eq("user", retrievedUser.data.user.id);

          if (data) {
            const foundCode = [];
            for (let i = 0; i < data!.length; i++) {
              const row = data![i];
              if (row!.short_code === code) {
                foundCode.push(row);
              }
            }

            await supabase
              .from("codes")
              .update({ name: name, url: url })
              .eq("short_code", foundCode[0].short_code)
              .then(({ data, error }) => {
                res.status(200);
                res.json({
                  url,
                  name,
                  status: "success",
                  user: retrievedUser.data.user,
                });
              });
          }
        } else {
          res.status(400);
          res.json({ status: "error" });
        }
      });
  }
}
