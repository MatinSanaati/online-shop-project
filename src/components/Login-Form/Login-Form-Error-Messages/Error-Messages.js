import { AnimatePresence, motion } from "framer-motion";

export const ErrorMessages = ({ errors }) => {
    return (
        <div className="error-messages-container absolute transform px-5 z-10 rtl">
            <AnimatePresence>
                {errors.map((error, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.4 }}
                        className="error-box bg-red-500 text-white p-1 mt-4 rounded-lg shadow-lg text-right break-words text-base leading-relaxed"
                    >
                        {error}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
