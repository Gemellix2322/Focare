"use server";
import { createClient } from "@/lib/supabase";
import { Task } from "@/lib/types";

type ActionResult = {
  error?: { message: string };
};

export async function updateTask(id: number, newStatus: Task['status']): Promise<ActionResult> {
  const supabase = createClient();
  const { error } = await supabase
    .from('tasks')
    .update({ status: newStatus })
    .eq('id', id);

  if (error) {
    console.error('Error updating task:', error);
    return { error: { message: error.message } };
  }
  return {};
}