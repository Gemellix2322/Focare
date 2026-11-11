"use server";

import { createClient } from "../../../lib/supabase/server";
import { Task } from "@/lib/types";

export async function getTasks(): Promise<Task[]> {
  try {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar as tarefas:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao conectar ao Supabase:', error);
    return [];
  }
}