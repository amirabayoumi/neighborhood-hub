"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LoaderPinwheel } from "lucide-react";
import { useState, useEffect } from "react";
import { PollResultProps, Option } from "../types";
import { useActionState } from "react";
import { addVoteAction } from "@/actions";

const PollDetails = ({ poll }: PollResultProps) => {
  const [showResults, setShowResults] = useState(poll.status !== "open");
  const [hasVoted, setHasVoted] = useState(false);

  const initialState = { type: "", message: "" };
  const [message, action, isLoading] = useActionState(
    addVoteAction,
    initialState
  );

  useEffect(() => {
    if (message.type === "success" && !hasVoted) {
      setHasVoted(true);
      setTimeout(() => {
        setShowResults(true);
      }, 500);
    }
  }, [message, hasVoted]);

  const chartConfig = {
    votes: {
      label: "Votes",
      color: "var(--chart-2)",
    },
    label: {
      color: "var(--background)",
    },
  } satisfies ChartConfig;
  const totalVotes = poll.options.reduce(
    (sum: number, option: Option) => sum + option.votesCount,
    0
  );

  const chartData = poll.options.map((option) => ({
    option: option.title,
    votes: option.votesCount,
    percentage: totalVotes > 0 ? (option.votesCount / totalVotes) * 100 : 0, // Numeric for bar width
    percentageLabel:
      totalVotes > 0
        ? `${((option.votesCount / totalVotes) * 100).toFixed(0)}%`
        : "0%", // String for display
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span
            className={`inline-block w-5 h-5 rounded-full ${
              poll.status === "open"
                ? "bg-green-900/60 animate-pulse"
                : "bg-red-500"
            }`}
          ></span>
          <CardTitle className="text-lg">{poll.title}</CardTitle>
        </div>
        <CardDescription>{poll.description}</CardDescription>

        {poll.status === "open" && !showResults && (
          <div className="space-y-2 mt-4 transition-all duration-500 ease-in-out">
            <h4 className="font-medium text-gray-700">
              Vote for your preferred solution:
            </h4>
            {poll.options.map((option: Option) => (
              <form
                key={option.optionId}
                action={action}
                className="flex items-center gap-2"
              >
                <input type="hidden" name="problemId" value={poll._id} />
                <input type="hidden" name="optionId" value={option.optionId} />
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full px-3 py-2 rounded-md transition-colors ${
                    isLoading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-yellow text-light-purple hover:bg-yellow-200 disabled:opacity-50 cursor-pointer"
                  }`}
                >
                  {isLoading ? (
                    <LoaderPinwheel className="animate-spin mx-auto h-4 w-4" />
                  ) : (
                    option.title
                  )}
                </button>
              </form>
            ))}
          </div>
        )}

        <div className="text-sm text-muted-foreground mt-4">
          Status: {poll.status} • City: {poll.city} • Created:
          {new Date(poll.createdAt).toLocaleDateString()}
        </div>
      </CardHeader>

      {(showResults || poll.status !== "open") && (
        <div className="animate-in slide-in-from-top-2 duration-500">
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  right: 16,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="option"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) =>
                    value.length > 15 ? value.slice(0, 15) + "..." : value
                  }
                  hide
                />
                <XAxis dataKey="votes" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar dataKey="votes" fill="var(--color-votes)" radius={4}>
                  <LabelList
                    dataKey="option"
                    position="insideLeft"
                    offset={8}
                    className="fill-white"
                    fontSize={11}
                  />
                  <LabelList
                    dataKey="percentageLabel"
                    position="right"
                    offset={8}
                    className="fill-foreground"
                    fontSize={11}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              Total votes: {totalVotes}
            </div>
            <div className="text-muted-foreground leading-none">
              {hasVoted
                ? "Thank you for voting!"
                : "Poll closed. Voting is no longer available."}
            </div>
          </CardFooter>
        </div>
      )}
    </Card>
  );
};

export default PollDetails;
