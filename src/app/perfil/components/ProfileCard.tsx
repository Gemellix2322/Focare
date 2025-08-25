'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import { createClient } from '@/lib/supabase/client'

type UserProfile = {
    fullName: string;
    description: string;
    avatarUrl?: string;
};

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export function ProfileCard({ user }: { user: UserProfile }) {
    const supabase = createClient()

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            console.error("ERRO DE DEBUG: A função foi chamada, mas o usuário é NULO.");
            return;
        }

        const filePath = `${user.id}/${file.name}`;


        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file, {
                upsert: true
            })

        if (uploadError) {
            console.error("Erro no Upload: ", uploadError)
            return
        }

        const { data: urlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath)

        const publicUrl = urlData.publicUrl

        const { error: updateError } = await supabase
            .from('profiles')
            .update({ avatar_url: publicUrl })
            .eq('id', user.id);
            

        if (updateError) {
            console.error("Erro ao atualizar avatar no perfil:", updateError);
        } else {
            console.log("Avatar atualizado com sucesso!");
            window.location.reload();

        };
    }



    return (
        <Card className="mb-8">
            <CardContent className="pt-6 flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={user.avatarUrl} alt={user.fullName} />
                    <AvatarFallback className="text-3xl">{getInitials(user.fullName)}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{user.fullName}</h2>
                <p className="text-muted-foreground mb-6">{user.description}</p>

                <div
                    onClick={handleUploadClick}
                    className="w-full max-w-md p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                >
                    <Upload className="w-8 h-8 text-blue-500 mb-2" />
                    <p className="font-semibold">Arraste uma foto aqui ou clique para selecionar</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG ou GIF até 5MB</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/png, image/jpeg, image/gif"
                    />
                </div>
            </CardContent>
        </Card>
    );
}