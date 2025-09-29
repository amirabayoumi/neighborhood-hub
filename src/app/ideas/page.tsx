import AddProblem from "@/components/AddProblem";
import ProblemsList from "@/components/ProblemsList";

export default function SurveyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex flex-col justify-center items-center pt-8 pb-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Community Ideas & Suggestions
        </h1>
        <div className="max-w-2xl">
          <AddProblem />
        </div>
      </div>

      <div className="w-full">
        <ProblemsList />
      </div>
    </main>
  );
}
