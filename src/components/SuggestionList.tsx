
import {SuggestionListProps } from "../types";
import DeleteSuggestion from "./adminComponents/DeleteSuggestion";

const Suggestion = ({ solutions, problemId }: SuggestionListProps) => {
  return (
    <>
      {solutions.map((solution, index) => (
        <li key={index} className="mb-2 p-2 border rounded list-none flex space-between justify-between">
          <p>{solution.text}</p>
          <DeleteSuggestion suggestionId={solution.id} ProblemId={problemId} />
        </li>
      ))}
    </>
  );
};

export default Suggestion;
