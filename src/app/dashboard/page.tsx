"use client";

import React, { useState } from 'react';

// --- Ícones SVG ---
const BookOpenIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const BarChartIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" x2="12" y1="20" y2="10" />
        <line x1="18" x2="18" y1="20" y2="4" />
        <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
);

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);


// --- Tipagem para as Tarefas ---
type Task = {
  id: number;
  title: string;
  status: 'pending' | 'completed';
  date: string;
};

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Revisar Matemática - Funções Quadráticas", status: 'pending', date: '18/08/2025' },
    { id: 2, title: "Ler capítulo 5 de História - Revolução Industrial", status: 'completed', date: '17/08/2025' },
  ]);
  const [newTask, setNewTask] = useState('');

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    
    setTasks([...tasks, { id: newId, title: newTask, status: 'pending', date: formattedDate }]);
    setNewTask('');
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const toggleTaskStatus = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' }
        : task
    ));
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Meu Plano de Estudos</h1>
          <button className="text-gray-600 hover:text-gray-800">Sair</button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard icon={<BookOpenIcon className="text-blue-500" />} title="Total de Tarefas" value={tasks.length} />
          <SummaryCard icon={<CheckCircleIcon className="text-green-500" />} title="Concluídas" value={completedTasks} />
          <SummaryCard icon={<ClockIcon className="text-orange-500" />} title="Pendentes" value={pendingTasks} />
        </div>

        {/* Adicionar Tarefa */}
        <div className="bg-white p-4 rounded-2xl shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Digite sua matéria ou tarefa de estudo..."
              className="flex-grow h-12 px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-600 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Adicionar
            </button>
          </div>
        </div>

        {/* Lista de Tarefas */}
        <div>
          <h2 className="text-xl font-bold mb-4">Suas Tarefas</h2>
          <div className="space-y-4">
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} onDelete={handleDeleteTask} onToggle={toggleTaskStatus} />
            ))}
          </div>
        </div>
      </main>
      
      <footer className="bg-white mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center items-center gap-4 sm:gap-8 text-gray-500">
            <FooterLink icon={<SettingsIcon className="w-5 h-5"/>} label="Configurações" />
            <span className="text-gray-300">|</span>
            <FooterLink icon={<BarChartIcon className="w-5 h-5"/>} label="Estatísticas" />
             <span className="text-gray-300">|</span>
            <FooterLink icon={<UserIcon className="w-5 h-5"/>} label="Perfil" />
        </div>
      </footer>
    </div>
  );
}

// --- Componentes Auxiliares ---

function SummaryCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: number | string; }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
      <div className="p-3 bg-gray-100 rounded-full">
        {React.cloneElement(icon as React.ReactElement)}
      </div>
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function TaskItem({ task, onDelete, onToggle }: { task: Task; onDelete: (id: number) => void; onToggle: (id: number) => void; }) {
  const isCompleted = task.status === 'completed';
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <button onClick={() => onToggle(task.id)} className="cursor-pointer">
          {isCompleted ? (
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
          ) : (
            <ClockIcon className="w-6 h-6 text-orange-500" />
          )}
        </button>
        <div>
          <p className={`font-medium ${isCompleted ? 'line-through text-gray-400' : ''}`}>{task.title}</p>
          <p className="text-sm text-gray-400">{task.date}</p>
        </div>
      </div>
      <button onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-gray-100">
        <TrashIcon className="w-5 h-5" />
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
