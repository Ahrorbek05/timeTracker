import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, StopCircle } from 'lucide-react';

interface TrackedTime {
    id: number;
    task: string;
    duration: number;
}

const TimeTracker: React.FC = () => {
    const [isTracking, setIsTracking] = useState(false);
    const [currentTask, setCurrentTask] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [trackedTimes, setTrackedTimes] = useState<TrackedTime[]>([]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTracking) {
            interval = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTracking]);

    const startTracking = () => {
        if (currentTask) {
            setIsTracking(true);
        }
    };

    const pauseTracking = () => {
        setIsTracking(false);
    };

    const stopTracking = () => {
        if (currentTask && elapsedTime > 0) {
            setTrackedTimes([
                ...trackedTimes,
                { id: Date.now(), task: currentTask, duration: elapsedTime },
            ]);
            setCurrentTask('');
            setElapsedTime(0);
        }
        setIsTracking(false);
    };

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
        >
            <h2 className="text-2xl font-bold mb-4">Vaqt hisoblagich</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Vazifa nomi"
                    value={currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-2"
                />
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="flex space-x-2">
                        <button
                            onClick={startTracking}
                            disabled={isTracking || !currentTask}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                        >
                            <Play size={20} />
                        </button>
                        <button
                            onClick={pauseTracking}
                            disabled={!isTracking}
                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:opacity-50"
                        >
                            <Pause size={20} />
                        </button>
                        <button
                            onClick={stopTracking}
                            disabled={!isTracking && elapsedTime === 0}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
                        >
                            <StopCircle size={20} />
                        </button>
                    </div>
                    <div className="text-2xl font-mono">{formatTime(elapsedTime)}</div>
                </div>
            </div>
            <ul className="space-y-2">
                {trackedTimes.map((time) => (
                    <motion.li
                        key={time.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-between bg-gray-100 p-3 rounded"
                    >
                        <span>{time.task}</span>
                        <span>{formatTime(time.duration)}</span>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default TimeTracker;