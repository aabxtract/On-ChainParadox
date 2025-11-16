import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import type { Paradox } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowRight, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ParadoxCardProps {
    paradox: Paradox;
}

export function ParadoxCard({ paradox }: ParadoxCardProps) {
    const stateColor = {
        'Solvable': 'bg-green-500/20 text-green-400 border-green-500/30',
        'Unsure': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'Impossible': 'bg-red-500/20 text-red-400 border-red-500/30'
    };

    return (
        <Link href={`/paradox/${paradox.id}`} className="block group">
            <Card className="glassmorphism h-full flex flex-col transition-all duration-300 group-hover:border-primary group-hover:shadow-2xl group-hover:shadow-primary/20">
                <CardHeader>
                    <CardTitle className="text-lg font-bold truncate">{paradox.text}</CardTitle>
                    <CardDescription className="flex items-center text-xs pt-2">
                        <Clock className="h-3 w-3 mr-1.5"/>
                        {formatDistanceToNow(new Date(paradox.timestamp), { addSuffix: true })}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                    <div className="flex justify-between items-center">
                        <Badge variant="outline" className={cn("font-mono text-xs", stateColor[paradox.state])}>
                            {paradox.state}
                        </Badge>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end items-center text-sm text-primary">
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </CardFooter>
            </Card>
        </Link>
    );
}
