import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export function SystemSettings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Sistema</CardTitle>
                <CardDescription>
                    Ajuste as configurações de tema, notificações e outras preferências do sistema.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6 min-h-[300px]">
                <Construction className="w-16 h-16 text-muted-foreground" />
                <p className="mt-4 text-lg font-medium text-muted-foreground">
                    Em desenvolvimento
                </p>
            </CardContent>
        </Card>
    )
}