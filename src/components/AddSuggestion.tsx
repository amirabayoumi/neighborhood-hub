"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { addSolutionAction } from "@/actions";
import { useActionState } from "react";
import { LoaderPinwheel } from "lucide-react";

const AddSuggestion = ({ problemId }: { problemId: string }) => {
  const initialState = { type: "", message: "" };
  const [message, action, isLoading] = useActionState(
    addSolutionAction,
    initialState
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">+</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Suggestion</DialogTitle>
          <DialogDescription>
            Share your suggestion for this problem.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="mb-4">
          <input type="hidden" name="problemId" value={problemId} />
          <textarea
            name="text"
            rows={4}
            className="w-full p-2 border rounded"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <LoaderPinwheel /> : "Submit"}
          </Button>
          {message && (
            <div>
              <p
                className={
                  message.type === "success" ? "text-green-800" : "text-red-900"
                }
              >
                {message.message}
              </p>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSuggestion;
