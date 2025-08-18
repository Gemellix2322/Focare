"use server";

import { createClient } from "@/lib/supabase";
import { Task } from "@/lib/types";

export async function getTasks(): Promise<Task[]> {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }

  return data || [];
}
