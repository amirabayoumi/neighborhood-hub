import {
  useGetPollsQuery,
  useUpdatePollStatusMutation,
  useDeletePollMutation,
} from "@/store/pollsApi";
import PollDetails from "./PollDetails";

import { Button } from "@/components/ui/button";

import { Poll } from "@/types";

const PollsList = () => {
  const { data, error, isLoading } = useGetPollsQuery();
  const [updatePollStatus] = useUpdatePollStatusMutation();
  const [deletePoll] = useDeletePollMutation();

  if (isLoading) return <p className="p-6">Loading polls...</p>;
  if (error) return <p className="p-6 text-red-500">Failed to load polls</p>;

  const polls: Poll[] = data?.polls || [];

  const handleStatusUpdate = async (id: string, status: string) => {
    await updatePollStatus({ id, status });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this poll?")) return;
    await deletePoll(id);
  };
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">All Polls</h2>
      {polls.length === 0 ? (
        <p className="text-gray-500">No polls found.</p>
      ) : (
        <div className="grid gap-4">
          {polls.map((poll) => (
            <div
              key={poll._id}
              className="border p-4 rounded hover:shadow transition"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg cursor-pointer">
                  {poll.title}
                </h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    poll.status === "open"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {poll.status}
                </span>
              </div>
              <p className="text-gray-600">{poll.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                City: {poll.city} | Created:{" "}
                {new Date(poll.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2 mt-4">
                <Button
            
                  variant="secondary"
                  onClick={() =>
                    handleStatusUpdate(
                      poll._id,
                      poll.status === "open" ? "closed" : "open"
                    )
                  }
                  className=" hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  change status to {poll.status === "open" ? "Close" : "Open"}
                </Button>
                <PollDetails id={poll._id} />
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(poll._id)}

                  className="cursor-pointer hover:bg-black hover:text-red-300 transition-colors"
                >
                  Delete
                </Button>
         
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default PollsList;
