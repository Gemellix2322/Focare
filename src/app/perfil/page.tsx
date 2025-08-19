'use client'
import { Button } from "@/components/ui/button";
import { BarChart, LayoutDashboard, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function perfil() {
    const useRoute = useRouter()

    return (
        <div className="bg-gray-50 min-h-screen text-gray-800">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Meu Plano de Estudos</h1>
                    <Button className="text-gray-600 hover:text-gray-800" variant={'outline'} onClick={() => useRoute.push('/')}>Sair</Button>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                </div>

                <div>
                    <h2 className="text-xl font-bold mb-4">Suas Credenciais</h2>

                </div>
            </main>

            <footer className="bg-white mt-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center items-center gap-4 sm:gap-8 text-gray-500">
                    <FooterLink icon={<Settings className="w-5 h-5" />} label="Configurações" action={() => useRoute.push('#')}/>
                    <span className="text-gray-300">|</span>
                    <FooterLink icon={<BarChart className="w-5 h-5" />} label="Estatísticas" action={() => useRoute.push('#')}/>
                    <span className="text-gray-300">|</span>
                    <FooterLink icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" action={() => useRoute.push('/dashboard')}/>
                </div>
            </footer>
        </div>
    )
}

function FooterLink({ icon, label, action }: { icon: React.ReactNode; label: string; action: () => void}) {
    return (
        <a href="#" className="flex items-center gap-2 hover:text-blue-600 transition-colors" onClick={action}>
            {icon}
            <span className="hidden sm:inline">{label}</span>
        </a>
    )
}