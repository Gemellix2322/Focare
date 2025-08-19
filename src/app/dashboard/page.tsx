import { getTasks } from "./actions/getTasks";
import DashboardClient from "./dashboardClient";

export default async function DashboardPage() {
  const tasks = await getTasks();
  return <DashboardClient initialTasks={tasks} />;
}
