'use server';

import createSupabaseServerClient from '@/lib/supabase/server';

export default async function getSupabase() {
  const supabase = await createSupabaseServerClient();
  return supabase;
}
