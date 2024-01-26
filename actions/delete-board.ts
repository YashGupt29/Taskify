"use server";
import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";

export const deleteBoard = async (id: string) => {
  await db.boarding.delete({
    where: {
      id,
    },
  });
  revalidatePath("/organization/org_2bJJeB44KJ3656gq5CyovzxJ7nF");
};
