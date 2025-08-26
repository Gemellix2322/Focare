import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { User, Contact, HelpCircle } from "lucide-react";

export function ProfileSettings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Perfil</CardTitle>
                <CardDescription>
                    Gerencie os dados do seu perfil, como nome e avatar.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <TooltipProvider>
                    <div className="grid gap-6">

                        <div className="grid gap-2">
                            <Label htmlFor="username" className="flex items-center">
                                Nome de Usuário
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <HelpCircle className="h-4 w-4 text-muted-foreground ml-2 cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Este é o nome que será exibido publicamente para outros usuários. Pode ser seu apelido.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input id="username" placeholder='Seu nome de usuário' className="pl-10" />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="fullName" className="flex items-center">
                                Nome Completo
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <HelpCircle className="h-4 w-4 text-muted-foreground ml-2 cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Usado para fins de cobrança e comunicações formais. Não será exibido publicamente.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </Label>
                            <div className="relative">
                                <Contact className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input id="fullName" placeholder='Seu nome completo' className="pl-10" />
                            </div>
                        </div>

                    </div>
                </TooltipProvider>
            </CardContent>
        </Card>
    )
}