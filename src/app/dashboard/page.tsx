"use client";

import React, { useState, useEffect } from 'react';
import { Task } from '@/lib/types';
import { getTasks } from './actions/getTasks';
import { addTask } from './actions/addTask';
import { updateTask } from './actions/updateTask';
import { deleteTask } from './actions/deleteTask';
import { BookOpen, CheckCircle, Clock, Plus, Trash, Settings, BarChart, User } from 'lucide-react';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
      setIsLoading(false);
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTaskTitle.trim() === "") return;

    const result = await addTask(newTaskTitle);

    if (result.error) {
      setError(result.error.message);
    } else if (result.data) {
      setTasks([result.data, ...tasks]);
      setNewTaskTitle('');
    }
  };

  const handleToggleStatus = async (task: Task) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';

    setTasks(tasks.map(t => t.id === task.id ? { ...t, status: newStatus } : t));

    const result = await updateTask(task.id, newStatus);
    if (result.error) {
      setError("Falha ao atualizar a tarefa. Tente novamente.");
      setTasks(tasks.map(t => t.id === task.id ? { ...t, status: task.status } : t));
    }
  };

  const handleDeleteTask = async (id: number) => {
    const originalTasks = [...tasks];
    setTasks(tasks.filter(t => t.id !== id));

    const result = await deleteTask(id);
    if (result.error) {
      setError("Falha ao deletar a tarefa. Tente novamente.");
      setTasks(originalTasks);
    }
  };
  
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Meu Plano de Estudos</h1>
          <button className="text-gray-600 hover:text-gray-800">Sair</button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard icon={<BookOpen className="text-blue-500" />} title="Total de Tarefas" value={tasks.length} />
          <SummaryCard icon={<CheckCircle className="text-green-500" />} title="Concluídas" value={completedTasks} />
          <SummaryCard icon={<Clock className="text-orange-500" />} title="Pendentes" value={pendingTasks} />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Digite sua matéria ou tarefa de estudo..."
              className="flex-grow h-12 px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-600 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Adicionar
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Suas Tarefas</h2>
          {isLoading ? (
            <p className="text-center text-gray-500">Carregando tarefas...</p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-gray-500">Nenhuma tarefa encontrada. Adicione uma para começar!</p>
          ) : (
            <div className="space-y-4">
              {tasks.map(task => (
                <TaskItem key={task.id} task={task} onDelete={handleDeleteTask} onToggle={handleToggleStatus} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-white mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center items-center gap-4 sm:gap-8 text-gray-500">
            <FooterLink icon={<Settings className="w-5 h-5"/>} label="Configurações" />
            <span className="text-gray-300">|</span>
            <FooterLink icon={<BarChart className="w-5 h-5"/>} label="Estatísticas" />
             <span className="text-gray-300">|</span>
            <FooterLink icon={<User className="w-5 h-5"/>} label="Perfil" />
        </div>
      </footer>
    </div>
  );
}

function SummaryCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: number | string; }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
      <div className="p-3 bg-gray-100 rounded-full">{React.cloneElement(icon as React.ReactElement)}</div>
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function TaskItem({ task, onDelete, onToggle }: { task: Task; onDelete: (id: number) => void; onToggle: (task: Task) => void; }) {
  const isCompleted = task.status === 'completed';
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <button onClick={() => onToggle(task)} className="cursor-pointer">
          {isCompleted ? <CheckCircle className="w-6 h-6 text-green-500" /> : <Clock className="w-6 h-6 text-orange-500" />}
        </button>
        <div>
          <p className={`font-medium ${isCompleted ? 'line-through text-gray-400' : ''}`}>{task.title}</p>
          <p className="text-sm text-gray-400">{new Date(task.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      <button onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-gray-100">
        <Trash className="w-5 h-5" />
      </button>
    </div>
  );
}

function FooterLink({ icon, label }: { icon: React.ReactNode; label: string; }) {
    return (
        <a href="#" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            {icon}
            <span className="hidden sm:inline">{label}</span>
        </a>
    )
}
