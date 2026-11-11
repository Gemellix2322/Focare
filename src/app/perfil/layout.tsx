"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  User,
  BookOpen,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Config from "@/app/config/Config";

function NavLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
      {icon}
      {children}
    </Link>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span>Plano de Estudos IA</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <NavLink href="/dashboard" icon={<LayoutDashboard className="h-4 w-4" />}>
                Dashboard
              </NavLink>
              <NavLink href="#" icon={<BookOpen className="h-4 w-4" />}>
                Matérias
              </NavLink>
              <NavLink href="#" icon={<Target className="h-4 w-4" />}>
                Metas
              </NavLink>
            </nav>
          </div>
          
          <div className="mt-auto p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => router.push('/perfil')}>
              <User className="h-4 w-4" />
              Visualizar Perfil
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => setIsConfigOpen(true)}>
              <Settings className="h-4 w-4" />
              Configurações
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        {children}
      </main>
      <Config
      setIsConfigOpen={setIsConfigOpen}
      isConfigOpen={isConfigOpen}
      />
    </div>
  );
}