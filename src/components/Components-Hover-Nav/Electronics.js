// Imports--React
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

// Components
import { products } from "../../components/Products-Component/Products-component";
import { SuccessMessage } from "../../components/Components-Hover-Nav/Success-Message/Success-Message";

// اعداد فارسی
const toPersianDigits = (num) => {
    return num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
};

// قیمت سه‌رقمی
const formatPrice = (num) => {
    if (typeof num !== "number") return num;
    return num.toLocaleString("fa-IR").replace(/٬/g, "٬");
};

export const Electronics = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState({});
    const [showMessage, setShowMessage] = useState(false);

    // دسته‌بندی مورد نظر برای فیلتر
    const categoryList = [
        "لپ‌تاپ",
        "قطعات کامپیوتر",
        "مانیتور",
        "لوازم جانبی کامپیوتر",
        "گوشی موبایل",
        "تبلت",
        "لوازم جانبی موبایل",
        "لوازم جانبی تبلت"
    ];

    // فیلتر محصولات بر اساس دسته‌بندی
    const filteredProducts = products
        .filter(product => categoryList.includes(product.category))
        .map(product => {
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            const discountedPrice = Math.round(product.originalPrice - (product.originalPrice * discount) / 100);
            return { ...product, discount, discountedPrice };
        });

    const handleAddToCart = (product) => {
        setLoading((prev) => ({ ...prev, [product.id]: true }));

        setTimeout(() => {
            setLoading((prev) => ({ ...prev, [product.id]: false }));

            const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
            const updatedCart = [...existingCart, product];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            window.dispatchEvent(new Event("storage"));

            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 5000);
        }, 3000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: .8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="flex flex-col items-center mt-10 h-full min-h-screen"
        >
            {showMessage && <SuccessMessage show={showMessage} />}

            <button
                onClick={() => navigate("/")}
                className="bg-blue-500 absolute left-10 top-[10%] -translate-y-1/2 text-white p-3 rounded-full shadow-md transition-all duration-300 group md:hover:bg-blue-600"
            >
                <FaArrowLeft size={20} className="transition-transform duration-300" />
            </button>

            <h1 className="text-black text-xl font-bold tracking-wide text-right border-b-2 border-gray-300 pb-2 w-fit">
                کامپیوتر و لوازم دیجیتال
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 gap-6 w-full max-w-8xl">
                {filteredProducts.map((product, index) => (
                    <div key={`${product.id}-${index}`} className="bg-white p-4 rounded-xl shadow-md mt-5 flex flex-col items-center 
                    transition-transform duration-200 ease-in 
                    md:hover:shadow-xl md:hover:scale-105"
                    >
                        <img src={product.imageUrl} alt={product.name} className="w-full h-60 object-cover rounded-md" />
                        <h2 className="mt-2 text-lg font-semibold text-gray-800">{product.name}</h2>
                        <div className="flex justify-between items-center w-full mt-5">
                            <div>
                                {product.discount > 0 && (
                                    <span className="bg-red-500 text-white text-xs font-bold px-1 rounded-lg">
                                        {toPersianDigits(product.discount)}٪
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col items-center justify-between ml-1 self-end text-center">
                                <div className="flex justify-between items-center">
                                    <div className="ml-2">
                                        <p className="text-green-400 mt-1 text-lg font-semibold">{formatPrice(product.discountedPrice)}</p>
                                    </div>
                                    <div className="text-black flex flex-col">
                                        <div className="flex justify-end">
                                            <p>ن</p>
                                        </div>
                                        <div>
                                            <p>توما</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-red-400 line-through ml-12 text-xs">{formatPrice(product.originalPrice)}</p>
                            </div>
                        </div>

                        <div className="mt-5">
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center w-40 h-10"
                                disabled={loading[product.id]}
                            >
                                {loading[product.id] ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
                                ) : (
                                    "افزودن به سبد خرید"
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
