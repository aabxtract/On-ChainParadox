import { Progress } from "@/components/ui/progress";

interface ImpossibilityIndexProps {
    votes: {
        solvable: number;
        unsure: number;
        impossible: number;
    }
}

export function ImpossibilityIndex({ votes }: ImpossibilityIndexProps) {
    const totalVotes = votes.solvable + votes.unsure + votes.impossible;
    const toPercent = (value: number) => totalVotes > 0 ? (value / totalVotes) * 100 : 0;

    const bars = [
        { label: 'Solvable', value: toPercent(votes.solvable), count: votes.solvable, color: 'bg-green-500' },
        { label: 'Unsure', value: toPercent(votes.unsure), count: votes.unsure, color: 'bg-yellow-500' },
        { label: 'Impossible', value: toPercent(votes.impossible), count: votes.impossible, color: 'bg-red-500' },
    ];

    return (
        <div className="space-y-4 text-sm">
            {bars.map(bar => (
                <div key={bar.label} className="space-y-1">
                    <div className="flex justify-between items-center text-muted-foreground">
                        <span>{bar.label}</span>
                        <span className="font-mono">{bar.count} votes</span>
                    </div>
                     <Progress value={bar.value} indicatorClassName={bar.color} />
                </div>
            ))}
        </div>
    );
}

// Custom progress component to allow arbitrary indicator color
const ProgressIndicator = Progress.Indicator;
Progress.Indicator = React.forwardRef<
    React.ElementRef<typeof ProgressIndicator>,
    React.ComponentPropsWithoutRef<typeof ProgressIndicator> & { indicatorClassName?: string }
>(({ className, indicatorClassName, ...props }, ref) => (
    <ProgressIndicator
        ref={ref}
        className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName, className)}
        {...props}
    />
));
