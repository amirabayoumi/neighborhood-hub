import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useGetPollByIdQuery } from "@/store/pollsApi";
import { Button } from "../ui/button";

const PollDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetPollByIdQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (!data?.poll) return <p>No details available.</p>;

  const poll = data.poll;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" bg-yellow text-rich-black hover:bg-black hover:text-yellow cursor-pointer">
          See Poll Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="mt-3">{poll.title}</DialogTitle>
          <DialogDescription>
            Detailed view of the poll and its options.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-2">
          <p className="text-sm text-gray-500">
            City: {poll.city} | Status: {poll.status}
          </p>
          <div className="mt-2">
            <h4 className="font-semibold">
              Options - from most votes to least:
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              {[...poll.options]
                .sort((a, b) => b.votesCount - a.votesCount)
                .map((option) => (
                  <li key={option.optionId}>
                    {option.title} - {option.votesCount} votes
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PollDetails;
