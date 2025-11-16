export type ParadoxState = 'Solvable' | 'Unsure' | 'Impossible';

export type VoteType = 'solvable' | 'unsure' | 'impossible';

export type OracleAssessment = {
  probabilitySolvable: number;
  probabilityImpossible: number;
  reasoning: string;
  timestamp: number;
};

export type Paradox = {
  id: string;
  text: string;
  creatorAddress: string;
  timestamp: number;
  state: ParadoxState;
  votes: {
    solvable: number;
    unsure: number;
    impossible: number;
  };
  oracleAssessment?: OracleAssessment;
};
