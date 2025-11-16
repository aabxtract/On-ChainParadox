import { ParadoxState } from "@/lib/types";

interface ParadoxVisualProps {
    state: ParadoxState;
}

const UnsureVisual = () => (
    <div className="relative h-48 w-48 font-bold text-7xl text-accent/80 flex items-center justify-center">
        <span className="animate-glitch" data-text="?">?</span>
    </div>
);

const SolvableVisual = () => (
    <div className="h-48 w-48 rounded-full flex items-center justify-center animate-pulse-slow">
        <div className="w-full h-full rounded-full [background:conic-gradient(from_90deg_at_50%_50%,hsl(var(--accent))_0%,hsl(var(--primary))_50%,hsl(var(--accent))_100%)] animate-spin-slow"></div>
    </div>
);

const ImpossibleVisual = () => (
    <div className="h-48 w-48 relative flex items-center justify-center">
        {[...Array(5)].map((_, i) => (
            <div
                key={i}
                className="absolute border border-primary/50 rounded-md"
                style={{
                    width: `${100 - i * 20}%`,
                    height: `${100 - i * 20}%`,
                    animation: `spin ${5 + i * 2}s linear infinite ${i % 2 === 0 ? 'reverse' : ''}`,
                    opacity: 1 - i * 0.2
                }}
            />
        ))}
    </div>
);


export function ParadoxVisual({ state }: ParadoxVisualProps) {
    switch (state) {
        case 'Solvable':
            return <SolvableVisual />;
        case 'Impossible':
            return <ImpossibleVisual />;
        case 'Unsure':
        default:
            return <UnsureVisual />;
    }
}
