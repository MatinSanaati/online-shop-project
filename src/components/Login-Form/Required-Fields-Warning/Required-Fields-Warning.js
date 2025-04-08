// RequiredFieldsWarning.jsx
import { motion } from "framer-motion";
import React from "react";

export const RequiredFieldsWarning = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-400 text-white p-1 mt-4 mr-4 z-10 absolute rounded-lg shadow-lg text-right break-words text-base leading-relaxed"
        >
            <p>
                پر کردن همه‌ی فیلدها ضروریه 🙏
            </p>
        </motion.div>
    );
};
