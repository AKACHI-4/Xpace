'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Button } from "./ui/button";

import { SiAudiomack } from "react-icons/si";
import { RiSpaceShipLine } from "react-icons/ri";
import { IoIosAdd } from "react-icons/io";


import { JoinSpaces } from "./joinspace"
import { redirect } from "next/navigation";
import { createSpace } from "@/lib/api/createSpace";

export const Cardbar = () => {
  const instantSpace = async () => {
    const { data, error } = await createSpace();

    console.log(data, error);

    // if (error || !data) {
    //   console.error('Error creating space:', error);
    //   return;
    // }

    // return redirect(data?.link);
  }

  const laterSpace = async () => {
    const { data, error } = await createSpace();

    console.log(data, error);

    // if (error || !data) {
    //   console.error('Error creating space:', error);
    //   return;
    // }

    // navigator.clipboard.writeText(data?.code)
    //   .then(() => {
    //     console.log('Text copied to clipboard:', data?.code);
    //   })
    //   .catch((e) => {
    //     console.error('Error copying to clipboard:', e);
    //   });
  }

  return (
    <Card className="w-[350px] shadow-md shadow-blue-400">
      <CardHeader>
        <CardTitle className="text-lg">Create Space</CardTitle>
        <CardDescription>Host audio space in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <Popover>
          <PopoverTrigger className="bg-blue-500 border border-solid rounded-xl flex w-full justify-center items-center gap-4 py-2">
            <SiAudiomack color="white" size={30} />
            <p className="text-white font-semibold">New X-Audio Space</p>
          </PopoverTrigger>
          <PopoverContent className="">
            <button className="flex gap-2 hover:bg-blue-400" onClick={instantSpace}>
              <IoIosAdd size={25} />
              Create an Instant Space.
            </button>
            <br />
            <button className="flex gap-2 hover:bg-blue-400" onClick={laterSpace}>
              <RiSpaceShipLine size={25} />
              Create a Space for later.
            </button>
          </PopoverContent>
        </Popover>
      </CardContent>
      <div className="relative mb-6">
        <div className="absolute px-4 inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or
          </span>
        </div>
      </div>
      <CardContent>
        <JoinSpaces />

        {/* <form>

          <div>
            <Input
              className="border-gray-400 text-sm"
              placeholder="Enter Space link"
            />
          </div>
          <Button className="bg-blue-500">
            Join
          </Button>
        </form> */}
      </CardContent>
    </Card>
  )
}