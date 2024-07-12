"use server"

import getSupabase from "../supabase/getSupabase"
import crypto from "crypto"
import getUser from "@/lib/supabase/getUser";
import getUserSession from "../supabase/getUserSession";

function getCode(username: string): string {
  const timestamp = Date.now().toString();

  const hash = crypto.createHash('sha256').update(username + timestamp).digest('hex').substr(0, 8).toLowerCase();

  return hash.slice(0, 4) + '-' + hash.slice(4);
}

export const createSpace = async () => {
  const supabase = await getSupabase();

  const { data: { user }, } = await getUser();
  const metadata = user?.user_metadata

  if (!metadata || !metadata.full_name) {
    console.error('User metadata is missing or incomplete.');
    return { data: null, error: 'User metadata is missing or incomplete.' };
  }

  // console.log(metadata);

  const code = getCode(metadata?.full_name)
  const link = `http://localhost:3000/spaces/${code}`

  console.log(code, link);

  try {
    const { data, error } = await supabase
      .from('spaces')
      .insert([
        { code: code, link: link, creator: user?.id }
      ])
      .select();

    console.log(data);

    if (error) {
      console.error('Error creating Space :', error);
      return { data: null, error };
    }

    return { data: data, error: null };
  } catch (e) {
    console.error('Error during Supabase query:', e);
    return { data: null, error: e };
  }
}