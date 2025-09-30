"use server";

import { addProblem, addSolution, addVoteToPoll } from "./queries";
import { revalidatePath, revalidateTag } from "next/cache";


type Message = { type: string; message: string };


export async function addProblemAction(initialState: Message, fd: FormData) {
  const title = fd.get("title") as string;
    if (title && title.trim().length > 0) {
      await addProblem(title);
      revalidatePath('/ideas');
      revalidateTag('problems');
      return { type: "success", message: "Thank you for joining us!, your suggestion has been submitted." };
    }
    return { type: "error", message: "Please enter your suggestion " };
}

export async function addSolutionAction(initialState: Message, fd: FormData) {
  const problemId = fd.get("problemId") as string;
  const text = fd.get("text") as string;
  if (!text || text.trim().length === 0) {
    return { type: "error", message: "Please enter your solution." };
  }
  await addSolution(problemId, text);
  revalidatePath('/ideas');
  revalidateTag('problems');
  return { type: "success", message: "Solution added successfully!" };
}


export async function addVoteAction(initialState: Message, fd: FormData) {
  try {
    const problemId = fd.get("problemId") as string;
    const optionId = fd.get("optionId") as string;
    
    if (!problemId || !optionId) {
      return { type: "error", message: "Missing poll or option ID" };
    }
    
    await addVoteToPoll(problemId, optionId);
    
    // Revalidate both tags
    revalidateTag("polls");
    revalidatePath("/poll");
    
    return { type: "success", message: "Vote added successfully!" };
  } catch (error) {
    console.error("Error adding vote:", error);
    return { type: "error", message: "Failed to add vote. Please try again." };
  }
}


