"use client";
import { useGetPollsQuery } from "@/store/pollsApi";
import PollDetails from "./PollDetails";

const PollsList = () => {
  const { data, error, isLoading, refetch } = useGetPollsQuery(undefined, {
    pollingInterval: 5000, // Poll every 5 seconds for real-time updates
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading polls...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">Error loading polls</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const polls = data?.polls || [];

  return (
    <div className="space-y-6">
      {polls.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No polls available</p>
          <p className="text-gray-400 text-sm mt-2">
            Check back later for new polls!
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-2 grid-flow-row auto-rows-auto grid-cols-[repeat(auto-fit,minmax(600px,1fr))]">
            {polls
              .filter((poll) => poll.status === "open")
              .map((poll) => (
                <div key={poll._id} className="w-full max-w-[600px] mx-auto">
                  <PollDetails poll={poll} />
                </div>
              ))}
          </div>

          <div>
            <h2 className="text-center text-gray-600 text italic mt-4">
              thank you for participating! Here are the results of closed polls:
            </h2>
            <div className="grid gap-2 grid-flow-row auto-rows-auto grid-cols-[repeat(auto-fit,minmax(600px,1fr))] mt-4">
              {polls
                .filter((poll) => poll.status === "closed")
                .map((poll) => (
                  <div key={poll._id} className="w-full max-w-[600px] mx-auto">
                    <PollDetails poll={poll} />
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PollsList;
