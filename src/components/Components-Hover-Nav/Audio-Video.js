// وارد کردن کتابخانه‌های مورد نیاز
import React, { useState } from "react"; // ری‌اکت و هوک useState برای مدیریت وضعیت کامپوننت
import { motion } from "framer-motion"; // برای انیمیشن‌ها
import { useNavigate } from "react-router-dom"; // برای ناوبری میان صفحات
import { FaArrowLeft } from "react-icons/fa"; // آیکن برگشت
import { products } from "../../components/Products-Component/Products-component"; // لیست محصولات
import { SuccessMessage } from "../../components/Components-Hover-Nav/Success-Message/Success-Message"; // کامپوننت پیام موفقیت

// تبدیل اعداد انگلیسی به فارسی
const toPersianDigits = (num) => {
    return num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
};

// فرمت‌کردن قیمت به صورت سه‌رقمی با جداکننده
const formatPrice = (num) => {
    if (typeof num !== "number") return num;
    return num.toLocaleString("fa-IR").replace(/٬/g, "٬");
};

// کامپوننت اصلی مربوط به دسته صوتی و تصویری
export const AudioVideo = () => {
    const navigate = useNavigate(); // برای برگشت به صفحه اصلی
    const [loading, setLoading] = useState({}); // وضعیت لودینگ برای هر محصول
    const [showMessage, setShowMessage] = useState(false); // نمایش پیام موفقیت

    // فیلتر محصولات صوتی و تصویری و محاسبه تخفیف
    const filteredProducts = products
        .filter(product => ["لوازم صوتی", "تلویزیون"].includes(product.category)) // فقط دسته‌های خاص
        .map(product => {
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100); // درصد تخفیف
            const discountedPrice = Math.round(product.originalPrice - (product.originalPrice * discount) / 100); // قیمت نهایی با تخفیف
            return { ...product, discount, discountedPrice }; // افزودن فیلدهای جدید به محصول
        });

    // افزودن محصول به سبد خرید
    const handleAddToCart = (product) => {
        // فعال کردن حالت لودینگ برای دکمه
        setLoading((prev) => ({ ...prev, [product.id]: true }));

        // شبیه‌سازی تأخیر (مثلاً درخواست API)
        setTimeout(() => {
            // غیرفعال کردن لودینگ
            setLoading((prev) => ({ ...prev, [product.id]: false }));

            // دریافت سبد خرید فعلی از localStorage
            const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingItem = existingCart.find(item => item.id === product.id);

            let updatedCart;

            // اگر قبلاً این محصول در سبد بوده، فقط تعدادش افزایش پیدا کنه
            if (existingItem) {
                updatedCart = existingCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            } else {
                // اگر محصول جدید باشه، به صورت جدید اضافه بشه
                const newItem = {
                    ...product,
                    quantity: 1,
                    discountedPrice: product.discountedPrice
                };
                updatedCart = [...existingCart, newItem];
            }

            // ذخیره‌سازی سبد جدید در localStorage
            localStorage.setItem("cart", JSON.stringify(updatedCart));

            // اطلاع‌رسانی به سایر بخش‌ها در صورت نیاز
            window.dispatchEvent(new Event("storage"));

            // نمایش پیام موفقیت
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 5000);
        }, 3000);
    };

    // خروجی کامپوننت JSX
    return (
        <motion.div
            initial={{ opacity: 0, scale: .8 }} // وضعیت اولیه انیمیشن
            animate={{ opacity: 1, scale: 1 }} // حالت نهایی
            transition={{ duration: 1.5, ease: "easeInOut" }} // تنظیمات انیمیشن
            className="flex flex-col items-center mt-10 h-full min-h-screen" // استایل
        >
            {/* نمایش پیام موفقیت در صورت نیاز */}
            {showMessage && <SuccessMessage show={showMessage} />}

            {/* بخش بالای صفحه */}
            <div className="flex justify-between items-center z-50 bg-slate-200 border-b-2 border-slate-300 fixed top-0 left-0 right-0 w-full h-20">
                {/* دکمه برگشت به خانه */}
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-500 absolute left-10 text-white p-3 rounded-full shadow-md transition-all duration-300 group md:hover:bg-blue-600"
                >
                    <FaArrowLeft size={20} className="transition-transform duration-300" />
                </button>

                {/* عنوان صفحه */}
                <h1 className="text-black text-xl font-bold tracking-wide mr-5 text-right pb-2 w-fit">
                    صوتی تصویری
                </h1>
            </div>

            {/* نمایش محصولات به صورت گرید */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 gap-6 w-full max-w-8xl">
                {filteredProducts.map((product, index) => (
                    <div key={`${product.id}-${index}`} className="bg-white p-4 rounded-xl shadow-md mt-5 flex flex-col items-center transition-transform duration-200 ease-in md:hover:shadow-xl md:hover:scale-105">
                        {/* تصویر محصول */}
                        <img src={product.imageUrl} alt={product.name} className="w-full h-60 object-cover rounded-md" />

                        {/* نام محصول */}
                        <h2 className="mt-2 text-lg font-semibold text-gray-800">{product.name}</h2>

                        {/* بخش قیمت و تخفیف */}
                        <div className="flex justify-between items-center w-full mt-5">
                            <div>
                                {/* نمایش درصد تخفیف در صورت وجود */}
                                {product.discount > 0 && (
                                    <span className="bg-red-500 text-white text-xs font-bold px-1 rounded-lg">
                                        {toPersianDigits(product.discount)}٪
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col items-center justify-between ml-1 self-end text-center">
                                <div className="flex justify-between items-center">
                                    {/* قیمت نهایی با تخفیف */}
                                    <div className="ml-2">
                                        <p className="text-green-400 mt-1 text-lg font-semibold">
                                            {formatPrice(product.discountedPrice)}
                                        </p>
                                    </div>
                                    {/* واحد پول */}
                                    <div className="text-black flex flex-col">
                                        <div className="flex justify-end"><p>ن</p></div>
                                        <div><p>توما</p></div>
                                    </div>
                                </div>
                                {/* قیمت اصلی خط‌خورده */}
                                <p className="text-red-400 line-through ml-12 text-xs">
                                    {formatPrice(product.originalPrice)}
                                </p>
                            </div>
                        </div>

                        {/* دکمه افزودن به سبد خرید */}
                        <div className="mt-5">
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center w-40 h-10"
                                disabled={loading[product.id]} // غیرفعال در حالت لودینگ
                            >
                                {/* نمایش اسپینر هنگام افزودن */}
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
