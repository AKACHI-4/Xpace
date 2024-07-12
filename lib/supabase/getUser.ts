'use server';

import getSupabase from '@/lib/supabase/getSupabase';

export default async function getUser() {
  const supabase = await getSupabase();
  return supabase.auth.getUser();
}
