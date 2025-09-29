"use client";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useActionState } from "react";
import { LoaderPinwheel } from "lucide-react";
import { addProblemAction } from "@/actions";

const AddProblem = () => {
  const initialState = { type: "", message: "" };
  const [message, action, isLoading] = useActionState(
    addProblemAction,
    initialState
  );

  return (
    <section className="flex flex-col items-center gap-4 mb-8 border p-6 rounded-lg  shadow-md max-w-300 ">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Report a Problem or Suggest an Improvement
      </h2>

      <form action={action}>
        <div className="flex gap-4  ">
          <Input
            placeholder="Describe your idea or problem..."
            type="text"
            name="title"
            className="w-full md:w-96"
          />
          <Button disabled={isLoading}>
            {isLoading ? <LoaderPinwheel /> : "Submit"}
          </Button>
        </div>
      </form>

      {message && (
        <div>
          <p className={message.type === "success" ? "text-green-800" : "text-red-900"}>{message.message}</p>
        </div>
      )}
    </section>
  );
};
export default AddProblem;
