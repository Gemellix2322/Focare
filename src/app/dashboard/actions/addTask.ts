"use server";

import { createClient } from "@/lib/supabase";
import { Task } from "@/lib/types";

type AddTaskResult = {
  data?: Task;
  error?: { message: string };
};

export async function addTask(title: string): Promise<AddTaskResult> {
  if (!title) {
    return { error: { message: 'O título não pode estar vazio.' } };
  }
  
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: { message: 'Autenticação necessária.' } };
  }

  const { data, error } = await supabase
    .from('tasks')
    .insert({ title, user_id: user.id })
    .select()
    .single();

  if (error) {
    console.error('Error adding task:', error);
    return { error: { message: error.message } };
  }

  return { data };
}
