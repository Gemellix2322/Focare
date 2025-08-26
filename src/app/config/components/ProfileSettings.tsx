"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { User, Contact, HelpCircle, Mail, Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

// Você pode criar um tipo mais completo para o perfil
type Profile = {
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
    email: string | undefined;
}

export function ProfileSettings() {
    const supabase = createClient();
    const [profile, setProfile] = useState<Profile | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profileData, error } = await supabase
                    .from('profiles')
                    .select('username, full_name, avatar_url')
                    .eq('id', user.id)
                    .single();
                
                if (error) {
                    console.error("Erro ao buscar perfil:", error);
                } else {
                    setProfile({ ...profileData, email: user.email });
                }
            }
        };
        fetchProfile();
    }, []);

    const getInitials = (name: string | null | undefined) => {
        if (!name) return "?";
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !profile) return;

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const filePath = `${user.id}/${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file, { upsert: true });

        if (uploadError) {
            console.error("Erro no Upload: ", uploadError);
            return;
        }

        const { data: urlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);
        
        const publicUrl = urlData.publicUrl;

        const { error: updateError } = await supabase
            .from('profiles')
            .update({ avatar_url: publicUrl })
            .eq('id', user.id);

        if (updateError) {
            console.error("Erro ao atualizar avatar no perfil:", updateError);
        } else {
            setProfile({ ...profile, avatar_url: publicUrl });
            console.log("Avatar atualizado com sucesso!");
        }
    };


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
                    <div className="grid gap-8">
                        
                        <div className="flex items-center gap-4">
                            <div className="relative w-24 h-24 cursor-pointer" onClick={handleUploadClick}>
                                <Avatar className="w-full h-full">
                                    <AvatarImage src={profile?.avatar_url || undefined} alt="Avatar" />
                                    <AvatarFallback className="text-3xl">
                                        {getInitials(profile?.full_name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1.5 pointer-events-none">
                                    <Camera className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <Button onClick={handleUploadClick} variant="outline">Alterar Foto</Button>
                                <p className="text-xs text-muted-foreground mt-2">PNG, JPG, GIF até 5MB.</p>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/png, image/jpeg, image/gif"
                            />
                        </div>

                        <div className="grid gap-2" >
                            <Label>Email</Label>
                            <div className="relative" >
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input id="email" value={profile?.email || ''} className="pl-10" disabled />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="username" className="flex items-center">
                                Nome de Usuário
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input id="username" value={profile?.username || ''} onChange={(e) => setProfile(p => p ? {...p, username: e.target.value} : null)} placeholder='Seu nome de usuário' className="pl-10" />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="fullName" className="flex items-center">
                                Nome Completo
                            </Label>
                            <div className="relative">
                                <Contact className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input id="fullName" value={profile?.full_name || ''} onChange={(e) => setProfile(p => p ? {...p, full_name: e.target.value} : null)} placeholder='Seu nome completo' className="pl-10" />
                            </div>
                        </div>
                        
                        <Button className="w-full md:w-auto">Salvar Alterações</Button>
                    </div>
                </TooltipProvider>
            </CardContent>
        </Card>
    )
}