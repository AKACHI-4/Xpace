'use server';

import getSupabase from '@/lib/supabase/getSupabase';

export default async function getUserSession() {
  const supabase = await getSupabase();
  return supabase.auth.getSession();
}
