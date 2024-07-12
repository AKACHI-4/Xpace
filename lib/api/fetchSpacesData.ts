import { createClient } from "@supabase/supabase-js";
import getSupabase from "@/lib/supabase/getSupabase";

export async function fetchSpaceData(code: string) {
  const supabase = await getSupabase();

  try {
    // Query the Supabase table
    const { data, error } = await supabase
      .from('spaces')
      .select('link')
      .eq('code', code)
      .single();

    if (error) {
      console.error('Error fetching data:', error);
      return null;
    }

    return data;
  } catch (e) {
    console.error('Error during Supabase query:', e);
    return null;
  }
}
