import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { useCreatePollMutation } from "@/store/pollsApi";

const CreatePoll = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [createPoll] = useCreatePollMutation();

  const handleCreatePoll = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(""); // reset previous error

    const formData = new FormData(e.currentTarget);
    const title = (formData.get("title") as string).trim();
    const description = (formData.get("description") as string).trim();
    const city = (formData.get("city") as string).trim();
    const options = (formData.get("options") as string).trim();

    if (!title || !description || !city || !options ) {
      setFormError("All fields are required.");
      return;
    }

    try {
      await createPoll({
        title,
        description,
        city,
        options
      }).unwrap();
      setIsOpen(false); // close dialog
    } catch (err) {
      setFormError("Failed to create poll. Please try again.");
      console.error(err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-colors">
          Create New Poll
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Poll</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new poll.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 py-4" onSubmit={handleCreatePoll}>
          <div className="grid gap-1">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="options">Options (comma-separated)</Label>
            <Input
              id="options"
              name="options"
              placeholder="Option1, Option2, Option3"
            />
          </div>

          {formError && <p className="text-red-600 text-sm">{formError}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create Poll</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePoll;
