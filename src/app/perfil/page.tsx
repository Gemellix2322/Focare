'use client'
import { Button } from "@/components/ui/button";
import { BarChart, LayoutDashboard, Settings, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { StatsCards } from "./components/StatsCards";
import { ProfileCard } from "./components/ProfileCard";
import { StudyProgress } from "./components/StudyProgress";

import { createClient } from "@/lib/supabase/client";

type UserProfile = {
    username: string;
    fullName: string;
    avatarUrl?: string;
};
type StudyStats = {
    completedTasks: number;
    totalPlanned: number;
    daysFollowed: number;
    dailyAverageHours: number;
};
type ProgressData = {
    overallCompleted: number;
    overallTotal: number;
    subjects: { name: string; completed: number; total: number }[];
};


export default function Perfil() {
    const useRoute = useRouter();
    const supabase = createClient();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [stats, setStats] = useState<StudyStats | null>(null);
    const [progress, setProgress] = useState<ProgressData | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        setLoading(true);
        try {
            const { data: userData, error: userError } = await supabase
                .from('profiles')
                .select('username, full_name, avatar_url')
                .single();

            if (userError) throw userError;
            setUser({
                username: userData.username,
                fullName: userData.full_name,
                avatarUrl: userData.avatar_url,
            });

            setStats({
                completedTasks: 24,
                totalPlanned: 30,
                daysFollowed: 7,
                dailyAverageHours: 2.5,
            });

            setProgress({
                overallCompleted: 24,
                overallTotal: 30,
                subjects: [
                    { name: "Matemática", completed: 8, total: 10 },
                    { name: "História", completed: 6, total: 8 },
                    { name: "Português", completed: 10, total: 12 },
                ]
            });

        } catch (error) {
            console.error("Erro ao buscar dados do perfil:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="bg-gray-50 min-h-screen text-gray-800 dark:bg-gray-900 dark:text-gray-200">
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold">Meu Perfil</h1>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading && <p>Carregando perfil...</p>}

                {!loading && user && <ProfileCard user={user} />}
                {!loading && stats && <StatsCards stats={stats} />}
                {!loading && progress && <StudyProgress progress={progress} />}

            </main>

        </div>
    )
}
