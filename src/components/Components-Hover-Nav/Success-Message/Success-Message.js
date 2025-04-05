import "../../../styles/Success-Message/Success-Message.css";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export const SuccessMessage = ({ show }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="success-message"
                >
                    <FaCheckCircle className="check-icon text-green-300" />
                    <span className="success-text">😎 محصول با موفقیت به سبد خرید اضافه شد! 😎</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
