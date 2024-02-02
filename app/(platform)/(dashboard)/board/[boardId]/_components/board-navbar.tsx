import { auth } from "@clerk/nextjs";
import { Boarding } from "@prisma/client";
import React from "react";
import { BoardTitleForm } from "./board-titile-form";
import BoardOptions from "./board-options";
interface BoardNavbarProps {
  data: Boarding;
}
export const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  const { orgId } = auth();
  return (
    <div className="absolute w-full h-14 z-[40] text-white bg-black/50 top-14 flex items-center px-6 gap-x-4">
      <BoardTitleForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} />
      </div>
    </div>
  );
};
