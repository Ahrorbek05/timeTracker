import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Statistics: React.FC = () => {
    // Bu yerda haqiqiy ma'lumotlar bo'lishi kerak
    const data = [
        { name: 'Ish', time: 35 },
        {
            name: "O'qish", time: 20 },
    { name: 'Sport', time: 10 },
    { name: 'Oila', time: 15 },
        { name: 'Dam olish', time: 20 },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
        >
            <h2 className="text-2xl font-bold mb-4">Statistika</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="time" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default Statistics;