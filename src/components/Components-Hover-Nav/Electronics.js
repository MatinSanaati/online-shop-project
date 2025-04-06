import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { products } from "../../components/Products-Component/Products-component";
import { SuccessMessage } from "../../components/Components-Hover-Nav/Success-Message/Success-Message";

export const Electronics = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState({});
    const [showMessage, setShowMessage] = useState(false);

    const filteredProducts = products.filter(product =>
        ["لپ‌تاپ", "قطعات کامپیوتر", "مانیتور", "لوازم جانبی کامپیوتر",
            "گوشی موبایل", "تبلت", "لوازم جانبی موبایل", "لوازم جانبی تبلت"]
            .includes(product.category)
    );

    const handleAddToCart = (productId) => {
        setLoading((prev) => ({ ...prev, [productId]: true }));

        setTimeout(() => {
            setLoading((prev) => ({ ...prev, [productId]: false }));

            const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
            const selectedProduct = products.find((p) => p.id === productId);

            if (selectedProduct) {
                const updatedCart = [...existingCart, selectedProduct];
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                window.dispatchEvent(new Event("storage"));

                // **پس از اطمینان از ذخیره محصول، پیام موفقیت نمایش داده شود**
                setShowMessage(true);
                console.log("✅ پیام موفقیت باید نمایش داده شود!");

                setTimeout(() => {
                    console.log("🔴 پیام موفقیت حذف شد.");
                    setShowMessage(false);
                }, 5000);
            }
        }, 3000);
    };

    // Render
    return (
        <motion.div
            initial={{ opacity: 0, scale: .8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center mt-10 h-full min-h-screen"
        >
            {/* پیام موفقیت */}
            {showMessage && <SuccessMessage show={showMessage} />}

            <button
                onClick={() => navigate("/")}
                className="bg-blue-500 absolute left-10 top-[40%] -translate-y-1/2 text-white p-3 rounded-full shadow-md 
               hover:bg-blue-600 transition-all duration-300 group"
            >
                <FaArrowRight size={20} className="transition-transform duration-300 ease-out group-hover:rotate-180" />
            </button>

            <h1 className="text-black text-xl font-bold tracking-wide mt-52 text-right border-b-2 border-gray-300 pb-2 w-fit">
                الکترونیک و دیجیتال
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 gap-6 w-full mt-10 max-w-8xl">
                {filteredProducts.map((product, index) => (
                    <div key={`${product.id}-${index}`} className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center hover:shadow-xl hover:scale-105 transition-transform duration-200 ease-in">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-60 object-cover rounded-md" />
                        <h2 className="mt-2 text-lg font-semibold text-gray-800">{product.name}</h2>
                        <div className="flex justify-between items-center w-full mt-5">
                            <div>
                                {product.discount > 0 && (
                                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                                        {product.discount}%
                                    </span>
                                )}
                            </div>
                            <div className="flex justify-between w-20 self-end text-center">
                                <p className="text-red-500 line-through text-sm">{product.originalPrice}</p>
                                <p className="text-green-400 mt-1 text-lg font-semibold">{product.price}</p>
                            </div>
                        </div>
                        <div className="mt-5">
                            <button
                                onClick={() => handleAddToCart(product.id)}
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
