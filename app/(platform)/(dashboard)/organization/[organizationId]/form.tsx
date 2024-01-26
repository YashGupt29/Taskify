"use client";
import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { useAction } from "@/hooks/use-action";
import { error } from "console";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-button";

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "Success");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title });
  };
  return (
    <form action={onSubmit}>
      <div>
        <FormInput id="title" errors={fieldErrors} label="Board Title" />
      </div>
      <FormSubmit> Save </FormSubmit>
    </form>
  );
};
