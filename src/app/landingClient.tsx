"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart, Book, Code, Lock, Mail, Target } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingClient() {
  const router = useRouter();
  const supabase = createClient(); // agora não precisa de await aqui

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const handleLogin = async () => {
    setIsSubmitting(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
    setIsSubmitting(false);
  };

  const handleSignUp = async () => {
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Cadastro realizado! Verifique seu e-mail para confirmação.");
      setAuthMode("login");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen w-full bg-white text-gray-800">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="container mx-auto grid lg:grid-cols-2 min-h-screen">
        <div className="hidden lg:flex flex-col justify-center p-12">
          <h1 className="text-5xl font-bold leading-tight">
            Revolucione seus <span className="text-blue-600">estudos com IA</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
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
          <Card className="w-full max-w-md shadow-2xl rounded-2xl">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Code className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">Gestão de Estudos com IA</h2>
              <p className="text-gray-500 mt-1">Organize seus estudos de forma inteligente</p>
            </div>

            <div className="px-6 pb-2">
              <div className="flex border border-gray-200 rounded-lg p-1 mb-6 bg-gray-50">
                <Button
                  className="w-1/2 bg-white shadow-sm text-blue-600 font-semibold hover:text-white"
                  onClick={() => setAuthMode("login")}
                >
                  Entrar
                </Button>
                <Button
                  className="w-1/2 text-gray-500 bg-stone-100"
                  onClick={() => setAuthMode("signup")}
                >
                  Cadastrar
                </Button>
              </div>
            </div>

            <CardContent className="space-y-4">
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              {message && <p className="text-green-500 text-sm text-center">{message}</p>}

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="********"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={authMode === "login" ? handleLogin : handleSignUp}
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? authMode === "login"
                      ? "Entrando..."
                      : "Cadastrando..."
                    : authMode === "login"
                      ? "Entrar"
                      : "Criar Conta"}
                </Button>
              </div>
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
      <div className="flex-shrink-0 bg-blue-50 p-3 rounded-full">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
}
