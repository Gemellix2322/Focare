export type Task = {
  id: number;
  created_at: string;
  title: string;
  status: 'pending' | 'completed';
  user_id: string;
  due_date: string | null; 
};
