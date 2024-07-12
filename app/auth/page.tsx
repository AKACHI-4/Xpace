
"use client"

import React from "react";

import useSupabaseClient from '@/lib/supabase/supabaseClient';
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

function GoogleSignInButton() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const supabase = useSupabaseClient();

  const signInWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Button variant="outline" type="button" disabled={isLoading} onClick={signInWithGoogle}>
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.google className="mr-2 h-4 w-4" />
      )}{" "}
      Sign In With Google
    </Button>
  )
}

export default function Auth() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <GoogleSignInButton />
    </div>
  );
}