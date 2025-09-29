import PollsList from "@/components/PollsList";
export default function PollPage() {
  return (
    <main className=" mx-auto p-4 flex flex-col min-h-screen ">
      <h1 className="text-3xl font-bold mb-4">
        Share Your Opinion, it Matters
      </h1>
      <PollsList />
    </main>
  );
}
