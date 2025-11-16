import Link from 'next/link';
import type { Paradox } from '@/lib/types';
import { cn } from '@/lib/utils';
import { TrendingUp, Flame, CheckCircle, XCircle } from 'lucide-react';

interface LeaderboardItemProps {
  paradox: Paradox;
  rank: number;
  displayMetric: 'total' | 'controversy' | 'solvable' | 'impossible';
}

const getMetric = (paradox: Paradox, metric: LeaderboardItemProps['displayMetric']) => {
    const total = paradox.votes.solvable + paradox.votes.unsure + paradox.votes.impossible;
    if (total === 0) return { value: 0, label: 'votes' };

    switch (metric) {
        case 'total':
            return { value: total, label: 'votes' };
        case 'controversy':
            const controversyScore = (paradox.votes.solvable + paradox.votes.impossible) - Math.abs(paradox.votes.solvable - paradox.votes.impossible);
            return { value: controversyScore, label: 'score'};
        case 'solvable':
            return { value: Math.round((paradox.votes.solvable / total) * 100), label: '% solvable' };
        case 'impossible':
            return { value: Math.round((paradox.votes.impossible / total) * 100), label: '% impossible' };
        default:
            return { value: 0, label: '' };
    }
}

const rankColors = [
    'text-yellow-400', // 1st
    'text-gray-400',   // 2nd
    'text-yellow-600', // 3rd
];

export function LeaderboardItem({ paradox, rank, displayMetric }: LeaderboardItemProps) {
    const metric = getMetric(paradox, displayMetric);

    return (
        <Link href={`/paradox/${paradox.id}`} className="block group">
            <div className="flex items-center gap-4 text-sm p-2 rounded-md group-hover:bg-primary/10 transition-colors">
                <div className={cn("text-lg font-bold w-6 text-center", rankColors[rank-1] || 'text-muted-foreground')}>
                    {rank}
                </div>
                <div className="flex-1 truncate">
                    <p className="truncate text-foreground">{paradox.text}</p>
                </div>
                <div className="font-mono text-right text-primary">
                    <div className="font-bold">{metric.value}{metric.label.startsWith('%') && '%'}</div>
                    <div className="text-xs text-muted-foreground">{metric.label.replace('% ','')}</div>
                </div>
            </div>
        </Link>
    );
}