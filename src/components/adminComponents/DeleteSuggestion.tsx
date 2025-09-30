"use client";

import { deleteSolutionAction } from "@/actions";
import { Dialog } from "@radix-ui/react-dialog";
import { useActionState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { LoaderPinwheel, Trash } from "lucide-react";

const DeleteSuggestion = ({
  suggestionId,
  ProblemId,
}: {
  suggestionId: string;
  ProblemId: string;
}) => {
  const initialState = { type: "", message: "" };
  const [message, action, isLoading] = useActionState(
    deleteSolutionAction,
    initialState
  );

  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="destructive">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Suggestion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this suggestion?
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="mb-4">
          <input type="hidden" name="solutionId" value={suggestionId} />
          <input type="hidden" name="problemId" value={ProblemId} />
          <Button type="submit" disabled={isLoading} variant="destructive">
            {isLoading ? <LoaderPinwheel className="animate-spin" /> : "Delete"}
          </Button>
          {message && (
            <div
              className={`mt-2 p-2 rounded text-sm ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.message}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSuggestion;
