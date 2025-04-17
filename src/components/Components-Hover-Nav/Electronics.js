// Imports--React
import React, { useState } from "react"; // React و hook برای state
import { motion } from "framer-motion"; // انیمیشن دادن به اجزا
import { useNavigate } from "react-router-dom"; // برای ناوبری بین صفحات
import { FaArrowLeft } from "react-icons/fa"; // آیکون فلش برگشت

// Components
import { products } from "../../components/Products-Component/Products-component"; // لیست همه‌ی محصولات
import { SuccessMessage } from "../../components/Components-Hover-Nav/Success-Message/Success-Message"; // کامپوننت پیام موفقیت بعد از افزودن به سبد

// تبدیل اعداد انگلیسی به فارسی
const toPersianDigits = (num) => {
    return num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
};

// فرمت کردن قیمت به صورت سه رقمی
const formatPrice = (num) => {
    if (typeof num !== "number") return num;
    return num.toLocaleString("fa-IR").replace(/٬/g, "٬");
};

export const Electronics = () => {
    const navigate = useNavigate(); // برای تغییر مسیر از طریق کد
    const [loading, setLoading] = useState({}); // مدیریت لود شدن هر دکمه
    const [showMessage, setShowMessage] = useState(false); // کنترل نمایش پیام موفقیت

    // دسته‌بندی‌های مربوط به لوازم دیجیتال
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

    // فیلتر کردن محصولات بر اساس دسته‌بندی و محاسبه تخفیف
    const filteredProducts = products
        .filter(product => categoryList.includes(product.category))
        .map(product => {
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            const discountedPrice = Math.round(product.originalPrice - (product.originalPrice * discount) / 100);
            return { ...product, discount, discountedPrice };
        });

    // هندل کردن افزودن به سبد خرید
    const handleAddToCart = (product) => {
        setLoading((prev) => ({ ...prev, [product.id]: true })); // فعال‌سازی لود

        setTimeout(() => {
            setLoading((prev) => ({ ...prev, [product.id]: false })); // غیر فعال‌سازی لود

            const existingCart = JSON.parse(localStorage.getItem("cart")) || []; // خواندن سبد قبلی

            // چک کنیم محصول قبلاً توی سبد هست یا نه
            const existingItem = existingCart.find(item => item.id === product.id);

            let updatedCart;
            if (existingItem) {
                // اگر هست، فقط تعدادش رو زیاد کن
                updatedCart = existingCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            } else {
                // اگه نیست، محصول جدید رو با مقدار اولیه اضافه کن
                const newItem = {
                    ...product,
                    quantity: 1,
                    discountedPrice: Math.round(product.originalPrice - (product.originalPrice * product.discount) / 100)
                };
                updatedCart = [...existingCart, newItem];
            }

            localStorage.setItem("cart", JSON.stringify(updatedCart)); // ذخیره‌سازی سبد جدید
            window.dispatchEvent(new Event("storage")); // آپدیت شدن سبد در کل برنامه

            setShowMessage(true); // نمایش پیام موفقیت
            setTimeout(() => setShowMessage(false), 5000); // بستن پیام بعد از ۵ ثانیه
        }, 3000);
    };

    // رندر کامپوننت
    return (
        <motion.div
            initial={{ opacity: 0, scale: .8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="flex flex-col items-center mt-10 h-full min-h-screen"
        >
            {/* نمایش پیام موفقیت */}
            {showMessage && <SuccessMessage show={showMessage} />}

            {/* دکمه بازگشت به خانه */}
            <button
                onClick={() => navigate("/")}
                className="bg-blue-500 absolute left-10 top-[10%] -translate-y-1/2 text-white p-3 rounded-full shadow-md transition-all duration-300 group md:hover:bg-blue-600"
            >
                <FaArrowLeft size={20} className="transition-transform duration-300" />
            </button>

            {/* عنوان صفحه */}
            <h1 className="text-black text-xl font-bold tracking-wide text-right border-b-2 border-gray-300 pb-2 w-fit">
                کامپیوتر و لوازم دیجیتال
            </h1>

            {/* نمایش محصولات */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 gap-6 w-full max-w-8xl">
                {filteredProducts.map((product, index) => (
                    <div
                        key={`${product.id}-${index}`}
                        className="bg-white p-4 rounded-xl shadow-md mt-5 flex flex-col items-center transition-transform duration-200 ease-in md:hover:shadow-xl md:hover:scale-105"
                    >
                        {/* عکس محصول */}
                        <img src={product.imageUrl} alt={product.name} className="w-full h-60 object-cover rounded-md" />

                        {/* نام محصول */}
                        <h2 className="mt-2 text-lg font-semibold text-gray-800">{product.name}</h2>

                        {/* قیمت و تخفیف */}
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

                        {/* دکمه افزودن به سبد خرید */}
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
