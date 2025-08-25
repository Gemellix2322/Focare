import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type SubjectProgress = {
    name: string;
    completed: number;
    total: number;
};

type ProgressData = {
    overallCompleted: number;
    overallTotal: number;
    subjects: SubjectProgress[];
};

export function StudyProgress({ progress }: { progress: ProgressData }) {
    const overallPercentage = progress.overallTotal > 0 ? (progress.overallCompleted / progress.overallTotal) * 100 : 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Progresso de Estudos</CardTitle>
                <CardDescription>Seu desenvolvimento nos últimos 30 dias</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Progresso Geral</span>
                        <span className="text-sm text-muted-foreground">{progress.overallCompleted}/{progress.overallTotal} tarefas</span>
                    </div>
                    <Progress value={overallPercentage} className="w-full" />
                    <p className="text-sm text-muted-foreground mt-1">{Math.round(overallPercentage)}% das tarefas planejadas foram concluídas</p>
                </div>

                <div>
                    <h4 className="font-bold mb-3">Por Matéria</h4>
                    <div className="space-y-4">
                        {progress.subjects.map((subject) => (
                            <div key={subject.name}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium">{subject.name}</span>
                                    <span className="text-sm text-muted-foreground">{subject.completed}/{subject.total}</span>
                                </div>
                                <Progress value={(subject.completed / subject.total) * 100} />
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}