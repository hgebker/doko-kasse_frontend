type Player = 'tim' | 'jan' | 'ole' | 'hannes' | 'louisa' | 'sonstige';

type PlayerEntries = {
  [P in Player]: number;
};

interface Evening extends PlayerEntries {
  Datum: string;
  semester: string;
  sum: number;
  avg: number;
  max: number;
  min: number;
  maxPlayer: string;
  minPlayer: string;
}

interface SemesterReport {
  evenings: Evening[];
  eveningsCount: number;
  sumPerPlayer: PlayerEntries;
  minPerPlayer: PlayerEntries;
  maxPerPlayer: PlayerEntries;
  noOfParticipationsPerPlayer: PlayerEntries;
  averagePerPlayer: PlayerEntries;
  totalIncome: number;
  worst: Player;
  best: Player;
}

interface CashReport {
  totalIncome: number;
  totalExpenses: number;
  currentCash: number;
}
