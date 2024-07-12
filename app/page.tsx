import { redirect } from 'next/navigation';

import getUserSession from '@/lib/supabase/getUserSession';

import { Cardbar } from '@/components/cardbar';
import { Navbar } from '@/components/navbar';

export default async function Home() {
  const { data, error } = await getUserSession();

  if (error || !data?.session) {
    return redirect("/auth");
  }

  return (
    <main className="min-h-screen p-24">
      <div className="flex flex-col items-center justify-center m-10">
        <div>
          <Navbar />
        </div>

        <div>
          <Cardbar />
        </div>
      </div>
    </main>
  );
}
