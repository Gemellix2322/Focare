"use client"
import React from 'react';
import { CardContent, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BarChartIcon, BookIcon, CodeIcon, LockIcon, MailIcon, TargetIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';

export default function LandingPage() {
const router = useRouter();

const handleClick = () => {
  router.push('/dashboard')
}

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
            Organize, planeje e otimize seu aprendizado com o poder da inteligência artificial. Transforme sua rotina de estudos em resultados extraordinários.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-8">
            <FeatureCard
              icon={<CodeIcon className="w-8 h-8 text-blue-600" />}
              title="IA Personalizada"
              description="Algoritmos inteligentes que se adaptam ao seu ritmo"
            />
            <FeatureCard
              icon={<TargetIcon className="w-8 h-8 text-blue-600" />}
              title="Metas Inteligentes"
              description="Defina e acompanhe objetivos baseados em dados"
            />
            <FeatureCard
              icon={<BookIcon className="w-8 h-8 text-blue-600" />}
              title="Gestão Completa"
              description="Organize matérias, horários e progresso"
            />
            <FeatureCard
              icon={<BarChartIcon className="w-8 h-8 text-blue-600" />}
              title="Análise de Performance"
              description="Relatórios detalhados do seu desempenho"
            />
          </div>
        </div>

        <div className="flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl rounded-2xl">
            <div className="p-6 flex flex-col items-center text-center">
                 <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <CodeIcon className="w-8 h-8 text-blue-600"/>
                 </div>
                 <h2 className="text-2xl font-bold">Gestão de Estudos com IA</h2>
                 <p className="text-gray-500 mt-1">Organize seus estudos de forma inteligente</p>
            </div>
            
            <div className="px-6 pb-2">
                <div className="flex border border-gray-200 rounded-lg p-1 mb-6 bg-gray-50">
                    <Button className="w-1/2 bg-white shadow-sm text-blue-600 font-semibold hover:text-white">Entrar</Button>
                    <Button className="w-1/2 text-gray-500 bg-stone-100">Cadastrar</Button>
                </div>
            </div>

            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">E-mail</label>
                <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input type="email" placeholder="seu@email.com" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Senha</label>
                 <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input type="password" placeholder="********" />
                </div>
              </div>
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700" onClick={handleClick}>
                Entrar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 bg-blue-50 p-3 rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
}