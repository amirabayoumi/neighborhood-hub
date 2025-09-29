import { getProblems } from "@/queries";
import Problem from "./Problem";
import { Problem as ProblemType } from "../types";

const ProblemsList = async () => {
  const problems = await getProblems();

  return (
    <section className="max-w-7xl mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
          View Reported Problems & Share Your Suggestions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse through community-reported issues and ideas. You can add your
          own suggestions to any problem and help shape solutions together.
        </p>
      </div>

      {/* Problems List - Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {problems.map((problem: ProblemType) => (
          <Problem key={problem.id} problem={problem} />
        ))}
      </div>
    </section>
  );
};

export default ProblemsList;
