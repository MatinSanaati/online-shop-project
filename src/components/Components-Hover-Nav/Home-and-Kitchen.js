import React from "react";
import { motion } from "framer-motion";

export const HomeAndKitchen = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: .8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center justify-center min-h-[300px] bg-gradient-to-r from-blue-400 to-indigo-600 p-6 rounded-2xl shadow-lg"
        >
            <di className="bg-black mt-96">
                <h1 className="text-white text-3xl font-bold tracking-wide">
                    Home & Kitchen
                </h1>
            </di>
        </motion.div>
    );
};
