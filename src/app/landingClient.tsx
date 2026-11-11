"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Book, Code, Target } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingClient() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="container mx-auto grid lg:grid-cols-2 min-h-screen">
        <div className="hidden lg:flex flex-col justify-center p-12">
          <h1 className="text-5xl font-bold leading-tight">
            Revolucione seus <span className="text-blue-600">estudos com IA</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Organize, planeje e otimize seu aprendizado com o poder da inteligência artificial.
            Transforme sua rotina de estudos em resultados extraordinários.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-8">
            <FeatureCard
              icon={<Code className="w-8 h-8 text-blue-600" />}
              title="IA Personalizada"
              description="Algoritmos inteligentes que se adaptam ao seu ritmo"
            />
            <FeatureCard
              icon={<Target className="w-8 h-8 text-blue-600" />}
              title="Metas Inteligentes"
              description="Defina e acompanhe objetivos baseados em dados"
            />
            <FeatureCard
              icon={<Book className="w-8 h-8 text-blue-600" />}
              title="Gestão Completa"
              description="Organize matérias, horários e progresso"
            />
            <FeatureCard
              icon={<BarChart className="w-8 h-8 text-blue-600" />}
              title="Análise de Performance"
              description="Relatórios detalhados do seu desempenho"
            />
          </div>
        </div>

        <div className="flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-card">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="bg-muted p-3 rounded-full mb-4">
                <Code className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">Gestão de Estudos com IA</h2>
              <p className="text-gray-500 mt-1">Organize seus estudos de forma inteligente</p>
            </div>
            <CardContent>
              <Button className="w-full" onClick={() => router.push("/dashboard")}>
                Acessar estudos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 bg-muted p-3 rounded-full">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
