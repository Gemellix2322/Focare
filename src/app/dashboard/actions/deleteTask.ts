"use server";
import { createClient } from "@/lib/supabase";
import { ActionResult } from "next/dist/server/app-render/types";

export async function deleteTask(id: number): Promise<ActionResult> {
  const supabase = createClient();
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting task:', error);
    return { error: { message: error.message } };
  }
  return {};
}