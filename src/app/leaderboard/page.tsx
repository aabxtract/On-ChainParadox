import { getParadoxes } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LeaderboardList } from "@/components/paradox/leaderboard-list";
import type { Paradox } from "@/lib/types";

export default async function LeaderboardPage() {
  const paradoxes = await getParadoxes();

  const mostVoted = [...paradoxes].sort((a, b) => {
    const totalVotesA = a.votes.solvable + a.votes.unsure + a.votes.impossible;
    const totalVotesB = b.votes.solvable + b.votes.unsure + b.votes.impossible;
    return totalVotesB - totalVotesA;
  }).slice(0, 5);

  const mostControversial = [...paradoxes].sort((a, b) => {
      const controversyScore = (p: Paradox) => (p.votes.solvable + p.votes.impossible) - Math.abs(p.votes.solvable - p.votes.impossible);
      return controversyScore(b) - controversyScore(a);
  }).slice(0, 5);

  const mostSolvable = [...paradoxes].sort((a, b) => {
      const solvableRatio = (p: Paradox) => {
          const total = p.votes.solvable + p.votes.unsure + p.votes.impossible;
          return total > 0 ? p.votes.solvable / total : 0;
      }
      return solvableRatio(b) - solvableRatio(a);
  }).slice(0, 5);

  const mostImpossible = [...paradoxes].sort((a, b) => {
      const impossibleRatio = (p: Paradox) => {
          const total = p.votes.solvable + p.votes.unsure + p.votes.impossible;
          return total > 0 ? p.votes.impossible / total : 0;
      }
      return impossibleRatio(b) - impossibleRatio(a);
  }).slice(0, 5);


  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
      <Button variant="ghost" asChild>
        <Link href="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Feed
        </Link>
      </Button>
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-glow">
          Logic Leaderboards
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Consensus from the collective consciousness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>Most Voted</CardTitle>
            <CardDescription>Paradoxes with the most engagement.</CardDescription>
          </CardHeader>
          <CardContent>
            <LeaderboardList paradoxes={mostVoted} displayMetric="total" />
          </CardContent>
        </Card>
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>Most Controversial</CardTitle>
            <CardDescription>Dividing the minds of the masses.</CardDescription>
          </CardHeader>
          <CardContent>
            <LeaderboardList paradoxes={mostControversial} displayMetric="controversy" />
          </CardContent>
        </Card>
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>Most Solvable</CardTitle>
            <CardDescription>Where consensus points to a solution.</CardDescription>
          </CardHeader>
          <CardContent>
            <LeaderboardList paradoxes={mostSolvable} displayMetric="solvable" />
          </CardContent>
        </Card>
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>Most Impossible</CardTitle>
            <CardDescription>Paradoxes that defy resolution.</CardDescription>
          </CardHeader>
          <CardContent>
            <LeaderboardList paradoxes={mostImpossible} displayMetric="impossible" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}