
import {SuggestionListProps } from "../types";

const Suggestion = ({ solutions }: SuggestionListProps) => {
  return (
    <>
      {solutions.map((solution, index) => (
        <li key={index} className="mb-2 p-2 border rounded list-none">
          <p>{solution.text}</p>
        </li>
      ))}
    </>
  );
};

export default Suggestion;
