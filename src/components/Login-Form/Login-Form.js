import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const LoginForm = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 300);
        return () => clearTimeout(timer);
    }, []);

    // Render
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .8, ease: "easeOut" }}
            className="flex w-full items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        >
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: .5 }}
                    animate={{ opacity: 1, scale: [0.5, 1.1, 0.9, 1] }}
                    transition={{ duration: 1.5, delay: 1.3, ease: "easeOut" }}
                    className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-sm w-full"
                >
                    <h2 className="text-3xl font-bold text-white text-center mb-6">ورود به حساب</h2>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-white font-semibold">ایمیل</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 mt-2 bg-white/20 backdrop-blur-lg border-none rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-300 focus:outline-none"
                                placeholder="example@mail.com"
                            />
                        </div>

                        <div>
                            <label className="block text-white font-semibold">رمز عبور</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 mt-2 bg-white/20 backdrop-blur-lg border-none rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-300 focus:outline-none"
                                placeholder="********"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 transform transition-all duration-300">
                            ورود
                        </button>
                    </form>

                    <p className="text-white text-center mt-4 text-sm">
                        حساب ندارید؟ <Link to="#" className="text-yellow-300 font-bold hover:underline">ثبت نام کنید</Link>
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
};
