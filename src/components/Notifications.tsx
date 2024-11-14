import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Plus, X } from 'lucide-react';

interface Notification {
    id: number;
    message: string;
    time: string;
}

const Notifications: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [newNotification, setNewNotification] = useState({ message: '', time: '' });

    const addNotification = () => {
        if (newNotification.message && newNotification.time) {
            setNotifications([
                ...notifications,
                { id: Date.now(), ...newNotification },
            ]);
            setNewNotification({ message: '', time: '' });
        }
    };

    const removeNotification = (id: number) => {
        setNotifications(notifications.filter((notification) => notification.id !== id));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
        >
            <h2 className="text-2xl font-bold mb-4">Xabarnomalar</h2>
            <div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                    type="text"
                    placeholder="Xabarnoma matni"
                    value={newNotification.message}
                    onChange={(e) =>
                        setNewNotification({ ...newNotification, message: e.target.value })
                    }
                    className="flex-grow px-3 py-2 border rounded"
                />
                <div className="flex space-x-2">
                    <input
                        type="time"
                        value={newNotification.time}
                        onChange={(e) =>
                            setNewNotification({ ...newNotification, time: e.target.value })
                        }
                        className="px-3 py-2 border rounded"
                    />
                    <button
                        onClick={addNotification}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>
            <ul className="space-y-2">
                {notifications.map((notification) => (
                    <motion.li
                        key={notification.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-between bg-gray-100 p-3 rounded"
                    >
                        <div className="flex items-center space-x-2">
                            <Bell size={16} className="text-blue-500" />
                            <span>{notification.message}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span>{notification.time}</span>
                            <button
                                onClick={() => removeNotification(notification.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default Notifications;