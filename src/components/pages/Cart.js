// Style
import '../../styles/Cart-Style/Cart-Style.css';

// Import--React
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

// Imports
import { Footer } from "../Footer/Footer";
import { CartTotal } from '../Cart-Total/Cart-Total';

export const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(savedCart);
    }, []);

    useEffect(() => {
        const updateCart = () => {
            const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCartItems(savedCart);
        };

        window.addEventListener("storage", updateCart);
        return () => {
            window.removeEventListener("storage", updateCart);
        };
    }, []);

    const updateQuantity = (productId, change) => {
        const updatedCart = cartItems.map(item =>
            item.id === productId ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const removeItem = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <div className="mt-60 w-full h-screen">

            {/* نمایش باکس مجموع قیمت فقط زمانی که آیتمی در سبد خرید وجود دارد */}
            {cartItems.length > 0 && (
                <div className="Cart_Total fixed top-[35%] left-20 bg-white border-gray-900 rounded-lg p-4 w-96 shadow-lg">
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: .5, ease: "easeOut" }}
                    >
                        <CartTotal cartItems={cartItems} />
                    </motion.div>
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="w-full min-h-screen bg-gray-100 shadow-lg rounded-lg p-6">
                    <h1 className="cart_header text-2xl font-semibold text-gray-800 mb-4 text-center">🛒 سبد خرید شما</h1>
                    {cartItems.length > 0 ? (
                        <div className="flex flex-col justify-between items-start mt-10 w-full gap-4">
                            {cartItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex flex-col items-center justify-between border-b-2 p-4 gap-3 hover:shadow-lg transition-all w-96 h-96"
                                    initial={{ opacity: 0, y: -30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 1, y: 0 }}
                                >
                                    {/* عکس محصول */}
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-96 h-52 object-cover rounded-lg"
                                    />

                                    {/* نام و قیمت محصول */}
                                    <div className="text-center mt-2">
                                        <span className="text-lg font-medium text-gray-800">{item.name}</span>
                                        <p className="text-gray-500 text-sm mt-1">{item.price}</p>
                                    </div>

                                    {/* دکمه‌های کنترل تعداد و حذف */}
                                    <div className="flex items-center gap-2 mt-3">
                                        {item.quantity > 1 ? (
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                            >
                                                <FaMinus size={14} />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600 transition"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        )}

                                        <span className="text-lg font-semibold w-6 text-center">{item.quantity || 1}</span>

                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
                                        >
                                            <FaPlus size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            className="text-center text-gray-600 mt-20 text-9xl"
                            initial={{ opacity: 0, y: 500, scale: 0.5, rotate: -180 }}  // ابتدا آیکون محو و کوچک است و 180 درجه چرخیده
                            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}  // در نهایت آیکون قابل مشاهده، به اندازه اصلی و بدون چرخش است
                            transition={{
                                opacity: { duration: 0.3 },   // زمان محو شدن
                                y: { type: "spring", stiffness: 100, damping: 20 },  // تنظیمات حرکت به بالا
                                scale: { duration: 1.5 },     // زمان اسکیل گرفتن
                                rotate: { duration: 1 },    // زمان چرخش 180 درجه
                            }}
                        >
                            <p>🛒</p>
                        </motion.div>
                    )}
                </div>
            </motion.div>
            <Footer />
        </div>
    );
};
