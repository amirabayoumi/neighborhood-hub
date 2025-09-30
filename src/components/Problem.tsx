"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AddSuggestion from "./AddSuggestion";
import SuggestionList from "./SuggestionList";
import { ProblemProps } from "../types";
import { MessageSquare, Lightbulb } from "lucide-react";
import DeleteProblem from "./adminComponents/DeleteProblem";

const Problem = ({ problem }: ProblemProps) => {
  const solutionCount = problem.solutions.length;

  return (
    <Card className="mb-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            {problem.title}
          </CardTitle>

          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 bg-light-purple/30 text-purple-600 px-2 py-1 rounded-md"
            >
              <MessageSquare className="w-5 h-5" />
              {solutionCount}
            </Badge>
            <DeleteProblem problemId={problem.id} />
            <AddSuggestion problemId={problem.id} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Separator />

        {solutionCount > 0 ? (
          <SuggestionList solutions={problem.solutions} problemId={problem.id} />
        ) : (
          <div className="text-center py-8 text-gray-500 flex flex-col items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            <p className="text-sm">
              No comments yet — be the first to share yours!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Problem;
