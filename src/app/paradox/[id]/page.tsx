import { getParadox } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Bot, Clock, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Typewriter } from "@/components/ui/typewriter";
import { ParadoxVisual } from "@/components/paradox/paradox-visual";
import { ImpossibilityIndex } from "@/components/paradox/impossibility-index";
import { VotingPanel } from "@/components/paradox/voting-panel";
import { OraclePanel } from "@/components/paradox/oracle-panel";

export default async function ParadoxPage({ params }: { params: { id: string } }) {
    const paradox = await getParadox(params.id);

    if (!paradox) {
        notFound();
    }
    
    return (
        <div className="space-y-8 animate-fade-in">
             <Button variant="ghost" asChild>
                <Link href="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Feed
                </Link>
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="glassmorphism">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl md:text-3xl lg:text-4xl min-h-[100px] md:min-h-[120px]">
                                <Typewriter text={paradox.text} />
                            </CardTitle>
                            <CardDescription className="flex flex-wrap gap-x-4 gap-y-2 pt-4 text-xs">
                                <span className="flex items-center"><User className="mr-2 h-4 w-4" /> Creator: {paradox.creatorAddress}</span>
                                <span className="flex items-center"><Clock className="mr-2 h-4 w-4" /> Minted: {format(new Date(paradox.timestamp), "PPP p")}</span>
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="glassmorphism">
                        <CardHeader>
                            <CardTitle className="flex items-center text-xl font-headline">
                                <Bot className="mr-3 h-5 w-5 text-primary"/>
                                Logic Warp Oracle
                            </CardTitle>
                            <CardDescription>
                                An AI assessment of the paradox's logical integrity.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <OraclePanel paradox={paradox} />
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="glassmorphism text-center">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">
                                Evolving State
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center items-center">
                            <ParadoxVisual state={paradox.state} />
                        </CardContent>
                    </Card>
                    
                    <Card className="glassmorphism">
                        <CardHeader>
                           <CardTitle className="font-headline text-xl">Impossibility Index</CardTitle>
                           <CardDescription>The community consensus on this paradox.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ImpossibilityIndex votes={paradox.votes} />
                        </CardContent>
                    </Card>
                    
                    <VotingPanel paradoxId={paradox.id} />

                </div>
            </div>
        </div>
    );
}
