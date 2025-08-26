'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// O tipo do perfil pode ser movido para um arquivo compartilhado (ex: lib/types.ts)
type UserProfile = {
    username: string;
    avatarUrl?: string;
};

const getInitials = (name: string) => {
    if (!name) return "?";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export function ProfileCard({ user }: { user: UserProfile }) {
    return (
        <Card className="mb-8">
            <CardContent className="pt-6 flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={user.avatarUrl} alt={user.username} />
                    <AvatarFallback className="text-3xl">{getInitials(user.username)}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{user.username}</h2>
            </CardContent>
        </Card>
    );
}