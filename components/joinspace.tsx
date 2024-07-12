"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

import { fetchSpaceData } from "@/lib/api/fetchSpacesData";

const FormSchema = z.object({
  code: z.string().length(8, {
    message: "Code must be exactly 8 characters.",
  }),
});

export function JoinSpaces() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { code } = data;

    try {
      const space = await fetchSpaceData(code);

      if (space) {
        return redirect(space.link);
      } else {
        console.error('No data found for the provided code');
      }
    } catch (e) {
      console.error('Error during Supabase query:', e);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full justify-center items-center gap-2">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="border-gray-400 text-sm" placeholder="Enter a space code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-blue-500">Join</Button>
      </form>
    </Form>
  );
}
