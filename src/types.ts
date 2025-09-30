export interface Poll {
  _id: string;
  title: string;
  description: string;
  city: string;
  status: string;
  createdAt: string;
  closedAt: string | null;
  options: {
    optionId: string;
    title: string;
    votesCount: number;
  }[];
}

export interface Option {
  optionId: string;
  title: string;
  votesCount: number;
}
export interface NewPoll {
  title: string;
  description: string;
  city: string;
  options: string;
}

export type Solution = { 
  id: string;
  text: string;

};

export type SuggestionListProps = { solutions: Solution[], problemId: string };



export type Problem = {
    id: string;
    title: string;
    solutions: Solution[];
     
  };

  export type ProblemProps = {
      problem: Problem;
    };

export interface PollResultProps {
  poll: Poll;
}



export interface PollByIdResponse {
  poll: Poll;
}