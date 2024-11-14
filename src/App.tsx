import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import Planner from './components/Planner';
import TimeTracker from './components/TimeTracker';
import Notifications from './components/Notifications';
import Statistics from './components/Statistics';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'planner' | 'tracker' | 'notifications' | 'statistics'>('planner');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold flex items-center"
          >
            <Clock className="mr-2" /> Vaqtni Boshqarish Tizimi
          </motion.h1>
          <nav>
            <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <li>
                <button
                  onClick={() => setActiveTab('planner')}
                  className={`px-3 py-2 rounded-md ${activeTab === 'planner' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                >
                  Rejalashtirish
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('tracker')}
                  className={`px-3 py-2 rounded-md ${activeTab === 'tracker' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                >
                  Vaqt hisoblagich
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`px-3 py-2 rounded-md ${activeTab === 'notifications' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                >
                  Xabarnomalar
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('statistics')}
                  className={`px-3 py-2 rounded-md ${activeTab === 'statistics' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                >
                  Statistika
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto mt-8 p-4 sm:p-6">
        {activeTab === 'planner' && <Planner />}
        {activeTab === 'tracker' && <TimeTracker />}
        {activeTab === 'notifications' && <Notifications />}
        {activeTab === 'statistics' && <Statistics />}
      </main>
    </div>
  );
};

export default App;