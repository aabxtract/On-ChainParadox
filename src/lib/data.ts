import type { Paradox, ParadoxState, VoteType, OracleAssessment } from '@/lib/types';
import { randomBytes } from 'crypto';

// In-memory store for paradoxes, acting as a mock database.
const paradoxesDB = new Map<string, Paradox>();

// Seed with some initial data for demonstration purposes.
const initialParadoxes: Paradox[] = [
  {
    id: '1',
    text: 'This statement is false.',
    creatorAddress: '0x...logic',
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    state: 'Unsure',
    votes: { solvable: 5, unsure: 10, impossible: 3 },
  },
  {
    id: '2',
    text: 'If you try to fail, and succeed, which have you done?',
    creatorAddress: '0x...chaos',
    timestamp: Date.now() - 1000 * 60 * 60 * 12,
    state: 'Solvable',
    votes: { solvable: 15, unsure: 2, impossible: 1 },
  },
  {
    id: '3',
    text: 'A barber is a man in town who shaves all those, and only those, men in town who do not shave themselves. Who shaves the barber?',
    creatorAddress: '0x...russell',
    timestamp: Date.now() - 1000 * 60 * 30,
    state: 'Impossible',
    votes: { solvable: 2, unsure: 5, impossible: 20 },
  },
];

initialParadoxes.forEach(p => paradoxesDB.set(p.id, p));

export async function getParadoxes(): Promise<Paradox[]> {
  return Array.from(paradoxesDB.values()).sort((a, b) => b.timestamp - a.timestamp);
}

export async function getParadox(id: string): Promise<Paradox | undefined> {
  return paradoxesDB.get(id);
}

export async function addParadox(text: string): Promise<Paradox> {
  const newParadox: Paradox = {
    id: randomBytes(8).toString('hex'),
    text,
    creatorAddress: `0x...${randomBytes(4).toString('hex')}`, // Mock address
    timestamp: Date.now(),
    state: 'Unsure',
    votes: {
      solvable: 0,
      unsure: 1, // Start with one 'Unsure' vote from creator
      impossible: 0,
    },
  };
  paradoxesDB.set(newParadox.id, newParadox);
  return newParadox;
}

export async function addVote(id: string, voteType: VoteType): Promise<Paradox | undefined> {
    const paradox = await getParadox(id);
    if (!paradox) return undefined;

    paradox.votes[voteType]++;

    // Determine consensus shift
    const { solvable, unsure, impossible } = paradox.votes;
    let new_state: ParadoxState = 'Unsure';
    const max_votes = Math.max(solvable, unsure, impossible);

    if (max_votes > 0) {
      if (solvable === max_votes) new_state = 'Solvable';
      if (impossible === max_votes) new_state = 'Impossible';
      if (unsure === max_votes) new_state = 'Unsure';
    
      // Handle ties by defaulting to Unsure
      const vote_counts = [solvable, unsure, impossible];
      const max_count_occurrences = vote_counts.filter(v => v === max_votes).length;
      if (max_count_occurrences > 1) {
        new_state = 'Unsure';
      }
    }

    paradox.state = new_state;

    paradoxesDB.set(id, paradox);
    return paradox;
}

export async function addOracleAssessment(id: string, assessment: Omit<OracleAssessment, 'timestamp'>): Promise<Paradox | undefined> {
  const paradox = await getParadox(id);
  if (!paradox) return undefined;

  paradox.oracleAssessment = { ...assessment, timestamp: Date.now() };
  paradoxesDB.set(id, paradox);
  return paradox;
}
