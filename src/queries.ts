import { getDb } from "./connect";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { randomUUID } from "crypto";
import { Problem } from "./types";


export async function getProblems() {
  const db = await getDb();
  const collection = db.collection("problems");
  const problems = await collection.find({}).toArray();
  
  return problems.map((problem) => {
    const totalVotes = problem.solutions.reduce(
      (sum: number, s: { votes: number }) => sum + s.votes,
      0
    );

    return {
      id: problem._id.toString(),
      title: problem.title,
      solutions: problem.solutions.map(
        (s: { id: string; text: string; votes: number }) => ({
          ...s,
          percentage: totalVotes > 0 ? (s.votes / totalVotes) * 100 : 0,
        })
      ),
    };
  });
}

export async function addProblem(title: string) {
  const db = await getDb();
  const collection = db.collection("problems");

  await collection.insertOne({
    title,
    solutions: [],
    createdAt: new Date(),
  });

  revalidateTag("problems");
}

export async function addSolution(problemId: string, text: string) {
  const db = await getDb();
  const collection = db.collection("problems");

  await collection.updateOne(
    { _id: new ObjectId(problemId) },
    {
      $addToSet: {
        solutions: {
          id: randomUUID(),
          text,
        },
      },
    }
  );

  revalidateTag("problems");
}



export  async function deleteProblem(problemId: string) {
  const db = await getDb();
  const collection = db.collection("problems");

  await collection.deleteOne({ _id: new ObjectId(problemId) });

  revalidateTag("problems");
}



export async function deleteSolution(problemId: string, solutionId: string) {
  const db = await getDb();
  const collection = db.collection<Problem>("problems");

  await collection.updateOne(
    { _id: new ObjectId(problemId) },
    { $pull: { solutions: { id: solutionId } } }
  );

  revalidateTag("problems");
}


//add vote to polls options
export async function addVoteToPoll(pollId: string, optionId: string) {
  const db = await getDb();
  const collection = db.collection("polls");

  await collection.updateOne(
    { _id: new ObjectId(pollId), "options.optionId": optionId },
    { $inc: { "options.$.votesCount": 1 } }
  );

  revalidateTag("polls");
}






