// Style
import '../../styles/Login-Form/Login-Form.css';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export const LoginForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isRegister, setIsRegister] = useState(false); // toggle for form mode

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const formVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -40, scale: 0.95 }
    };

    return (
        <div className='section_login_form'>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="flex w-full items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500"
            >
                {isVisible && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isRegister ? "register" : "login"}
                            variants={formVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-lg max-w-sm w-full border border-white/20"
                        >
                            <h2 className="text-3xl font-extrabold text-white text-center mb-8">
                                {isRegister ? "ثبت‌ نام" : "ورود"}
                            </h2>

                            <form className="space-y-6">
                                {isRegister && (
                                    <div>
                                        <label className="block text-white font-medium mb-1">نام کامل</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-white/20 backdrop-blur-md border-none outline-none rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-300"
                                            placeholder="نام و نام خانوادگی . . ."
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-white font-medium mb-1">شماره تلفن</label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-2 bg-white/20 backdrop-blur-md border-none outline-none rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-300"
                                        placeholder="09XXXXXXXXX"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                                >
                                    {isRegister ? "ثبت‌ نام" : "ورود"}
                                </button>
                            </form>

                            <p className="text-white text-center mt-6 text-sm">
                                {isRegister ? (
                                    <>
                                        قبلاً ثبت‌ نام کردید؟{" "}
                                        <button
                                            onClick={() => setIsRegister(false)}
                                            className="text-yellow-300 font-bold hover:underline"
                                        >
                                            ورود به حساب
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        حساب کاربری ندارید؟{" "}
                                        <button
                                            onClick={() => setIsRegister(true)}
                                            className="text-yellow-300 font-bold hover:underline"
                                        >
                                            ثبت‌ نام کنید
                                        </button>
                                    </>
                                )}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                )}
            </motion.div>
        </div>
    );
};
