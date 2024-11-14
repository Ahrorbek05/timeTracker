import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Plus } from 'lucide-react';

interface Task {
    id: number;
    title: string;
    date: string;
    time: string;
}

const Planner: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({ title: '', date: '', time: '' });
    const [view, setView] = useState<'daily' | 'weekly' | 'monthly'>('daily');

    const addTask = () => {
        if (newTask.title && newTask.date && newTask.time) {
            setTasks([...tasks, { ...newTask, id: Date.now() }]);
            setNewTask({ title: '', date: '', time: '' });
        }
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
        >
            <h2 className="text-2xl font-bold mb-4">Rejalashtirish</h2>
            <div className="mb-4">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                    <button
                        onClick={() => setView('daily')}
                        className={`px-4 py-2 rounded ${view === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Kunlik
                    </button>
                    <button
                        onClick={() => setView('weekly')}
                        className={`px-4 py-2 rounded ${view === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Haftalik
                    </button>
                    <button
                        onClick={() => setView('monthly')}
                        className={`px-4 py-2 rounded ${view === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Oylik
                    </button>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <input
                        type="text"
                        placeholder="Vazifa nomi"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="flex-grow px-3 py-2 border rounded"
                    />
                    <div className="flex space-x-2">
                        <input
                            type="date"
                            value={newTask.date}
                            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                            className="px-3 py-2 border rounded"
                        />
                        <input
                            type="time"
                            value={newTask.time}
                            onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                            className="px-3 py-2 border rounded"
                        />
                        <button
                            onClick={addTask}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <ul className="space-y-2">
                {tasks.map(task => (
                    <motion.li
                        key={task.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-between bg-gray-100 p-3 rounded"
                    >
                        <span>{task.title}</span>
                        <div className="flex items-center space-x-2">
                            <Calendar size={16} className="text-gray-500" />
                            <span>{task.date}</span>
                            <Clock size={16} className="text-gray-500" />
                            <span>{task.time}</span>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                &times;
                            </button>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default Planner;