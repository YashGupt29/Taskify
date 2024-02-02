import { z } from "zod";
import { UpdateBoard } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Boarding } from "@prisma/client";

export type InputType = z.infer<typeof UpdateBoard>;
export type ReturnType = ActionState<InputType, Boarding>;
