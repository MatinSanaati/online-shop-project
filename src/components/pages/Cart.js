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
            item.id === productId
                ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) }
                : item
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
        <div className="w-full min-h-screen mt-40 px-4 md:px-20">
            <h1 className="cart_header relative text-2xl font-bold text-center text-gray-800 mb-8">🛒 سبد خرید شما</h1>

            {cartItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* لیست محصولات */}
                    <div className="md:col-span-2 flex flex-col gap-6">
                        {cartItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-4 items-center justify-between"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-full md:w-40 h-40 object-cover rounded-lg"
                                />

                                <div className='cart_item--info--action flex justify-between items-center gap-4'>
                                    <div className="flex-1 text-center md:text-right">
                                        <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                        <p className="text-gray-500 text-sm mt-1">{item.price}</p>
                                    </div>

                                    {/* Btns */}
                                    <div className="flex items-center gap-2">
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

                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* سایدبار قیمت */}
                    <div className="sidebar_section md:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: .5, ease: "easeOut" }}
                            className="motion bg-white rounded-xl shadow-lg sticky top-32"
                        >
                            <CartTotal cartItems={cartItems} />
                        </motion.div>
                    </div>

                    {/* درصورت خالی بودن سبدخرید */}
                </div>
            ) : (
                <motion.div
                    className="text-center text-gray-600 mt-20 text-9xl"
                    initial={{ opacity: 0, y: 500, scale: 0.5, rotate: -180 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                    transition={{
                        opacity: { duration: 0.3 },
                        y: { type: "spring", stiffness: 100, damping: 20 },
                        scale: { duration: 1.5 },
                        rotate: { duration: 1 },
                    }}
                >
                    <p>🛒</p>
                </motion.div>
            )}

            {/*  */}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {/*  */}

            <div className='footer__wrapper--section'>
                <Footer />
            </div>
        </div>
    );
};
