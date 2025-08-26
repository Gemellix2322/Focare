// components/Config.tsx

"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "../../components/ui/button";
import { cn } from "@/lib/utils";

// Importe os novos componentes de configuração
import { ProfileSettings } from "./components/ProfileSettings";
import { SystemSettings } from "./components/SystemSettings";
import { User, Smartphone } from "lucide-react";

interface ConfigProps {
    isConfigOpen: boolean;
    setIsConfigOpen: (open: boolean) => void;
}

type ActiveTab = 'perfil' | 'sistema';

export default function Config({ isConfigOpen, setIsConfigOpen }: ConfigProps) {
    const [activeTab, setActiveTab] = useState<ActiveTab>('perfil');

    return (
        <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
            <DialogContent className="sm:max-w-4xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-3xl">Configurações</DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-4 flex-grow overflow-hidden">
                    
                    <aside className="md:col-span-1 pr-6 border-r">
                        <nav className="flex flex-col gap-2">
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start gap-2",
                                    activeTab === 'perfil' && "bg-muted font-semibold"
                                )}
                                onClick={() => setActiveTab('perfil')}
                            >
                                <User className="w-4 h-4" />
                                Perfil
                            </Button>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start gap-2",
                                    activeTab === 'sistema' && "bg-muted font-semibold"
                                )}
                                onClick={() => setActiveTab('sistema')}
                            >
                                <Smartphone className="w-4 h-4" />
                                Sistema
                            </Button>
                        </nav>
                    </aside>

                    <main className="md:col-span-3 overflow-y-auto">
                        {activeTab === 'perfil' && <ProfileSettings />}
                        {activeTab === 'sistema' && <SystemSettings />}
                    </main>

                </div>
            </DialogContent>
        </Dialog>
    )
}