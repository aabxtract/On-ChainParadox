import type { Paradox } from "@/lib/types";
import { LeaderboardItem } from "./leaderboard-item";

interface LeaderboardListProps {
  paradoxes: Paradox[];
  displayMetric: 'total' | 'controversy' | 'solvable' | 'impossible';
}

export function LeaderboardList({ paradoxes, displayMetric }: LeaderboardListProps) {
  if (paradoxes.length === 0) {
    return <p className="text-sm text-muted-foreground text-center">Not enough data to rank paradoxes yet.</p>
  }
  
  return (
    <div className="space-y-4">
      {paradoxes.map((paradox, index) => (
        <LeaderboardItem 
          key={paradox.id}
          paradox={paradox} 
          rank={index + 1}
          displayMetric={displayMetric}
        />
      ))}
    </div>
  );
}