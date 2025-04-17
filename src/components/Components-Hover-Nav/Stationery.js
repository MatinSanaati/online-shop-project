// وارد کردن ماژول‌ها و کامپوننت‌های مورد نیاز
import React, { useState } from "react"; // هوک useState برای مدیریت وضعیت‌ها
import { motion } from "framer-motion"; // برای انیمیشن دادن به عناصر
import { useNavigate } from "react-router-dom"; // برای تغییر مسیر در روتینگ
import { FaArrowLeft } from "react-icons/fa"; // آیکون فلش برگشت
import { products } from "../../components/Products-Component/Products-component"; // لیست محصولات
import { SuccessMessage } from "../../components/Components-Hover-Nav/Success-Message/Success-Message"; // پیام موفقیت

// تبدیل اعداد انگلیسی به فارسی
const toPersianDigits = (num) => {
    return num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
};

// فرمت قیمت: اضافه کردن جداکننده سه‌رقمی به عدد
const formatPrice = (num) => {
    if (typeof num !== "number") return num;
    return num.toLocaleString("fa-IR").replace(/٬/g, "٬");
};

// تعریف کامپوننت Stationery
export const Stationery = () => {
    const navigate = useNavigate(); // برای برگشت به صفحه اصلی
    const [loading, setLoading] = useState({}); // وضعیت بارگذاری هر محصول
    const [showMessage, setShowMessage] = useState(false); // وضعیت نمایش پیام موفقیت

    // فیلتر کردن محصولات دسته‌بندی "لوازم تحریر" و محاسبه تخفیف و قیمت نهایی هرکدام
    const filteredProducts = products
        .filter(product => product.category.includes("لوازم تحریر")) // فیلتر دسته‌بندی
        .map(product => {
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100); // درصد تخفیف
            const discountedPrice = Math.round(product.originalPrice - (product.originalPrice * discount) / 100); // قیمت بعد تخفیف
            return { ...product, discount, discountedPrice }; // افزودن اطلاعات به شیء محصول
        });

    // تابع هندل کردن افزودن به سبد خرید
    const handleAddToCart = (product) => {
        setLoading((prev) => ({ ...prev, [product.id]: true })); // فعال کردن لودینگ برای این محصول

        // شبیه‌سازی تأخیر (مثل اتصال به سرور)
        setTimeout(() => {
            setLoading((prev) => ({ ...prev, [product.id]: false })); // غیرفعال کردن لودینگ

            const existingCart = JSON.parse(localStorage.getItem("cart")) || []; // گرفتن لیست سبد خرید از localStorage
            const existingItem = existingCart.find(item => item.id === product.id); // بررسی وجود این محصول در سبد

            let updatedCart;
            if (existingItem) {
                // اگر محصول در سبد هست، فقط quantity رو افزایش بده
                updatedCart = existingCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            } else {
                // اگر محصول جدید بود، به سبد اضافه کن
                const newItem = {
                    ...product,
                    quantity: 1,
                    discountedPrice: product.discountedPrice
                };
                updatedCart = [...existingCart, newItem];
            }

            localStorage.setItem("cart", JSON.stringify(updatedCart)); // ذخیره‌سازی سبد جدید
            window.dispatchEvent(new Event("storage")); // اطلاع به سایر تب‌ها یا بخش‌ها

            setShowMessage(true); // نمایش پیام موفقیت
            setTimeout(() => setShowMessage(false), 5000); // مخفی کردن پیام بعد ۵ ثانیه
        }, 3000);
    };

    // بخش UI
    return (
        <motion.div
            initial={{ opacity: 0, scale: .8 }} // وضعیت اولیه انیمیشن
            animate={{ opacity: 1, scale: 1 }}   // وضعیت نهایی انیمیشن
            transition={{ duration: 1.5, ease: "easeInOut" }} // زمان و نوع انیمیشن
            className="flex flex-col items-center mt-10 h-full min-h-screen" // استایل کلی
        >
            {/* نمایش پیام موفقیت اگر true باشد */}
            {showMessage && <SuccessMessage show={showMessage} />}

            {/* بخش بالای صفحه */}
            <div className="flex justify-between items-center z-50 bg-slate-200 border-b-2 border-slate-300 fixed top-0 left-0 right-0 w-full h-20">
                {/* دکمه برگشت به صفحه اصلی */}
                <button
                    onClick={() => navigate("/")} // وقتی کلیک میشه، کاربر به صفحه اصلی می‌ره
                    className="bg-blue-500 absolute left-10 text-white p-3 rounded-full shadow-md transition-all duration-300 group md:hover:bg-blue-600"
                >
                    <FaArrowLeft size={20} className="transition-transform duration-300" />
                </button>

                {/* تیتر صفحه */}
                <h1 className="text-black text-xl font-bold tracking-wide mr-5 text-right pb-2 w-fit">
                    لوازم تحریر
                </h1>
            </div>

            {/* نمایش محصولات فیلترشده در گرید */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 gap-6 w-full max-w-8xl">
                {filteredProducts.map((product, index) => (
                    <div
                        key={`${product.id}-${index}`} // کلید یکتا
                        className="bg-white p-4 rounded-xl shadow-md mt-5 flex flex-col items-center transition-transform duration-200 ease-in md:hover:shadow-xl md:hover:scale-105"
                    >
                        {/* تصویر محصول */}
                        <img src={product.imageUrl} alt={product.name} className="w-full h-60 object-cover rounded-md" />

                        {/* نام محصول */}
                        <h2 className="mt-2 text-lg font-semibold text-gray-800">{product.name}</h2>

                        {/* تخفیف و قیمت */}
                        <div className="flex justify-between items-center w-full mt-5">
                            <div>
                                {/* اگر تخفیف دارد، نشان بده */}
                                {product.discount > 0 && (
                                    <span className="bg-red-500 text-white text-xs font-bold px-1 rounded-lg">
                                        {toPersianDigits(product.discount)}٪
                                    </span>
                                )}
                            </div>

                            {/* قیمت تخفیف‌خورده و قیمت اصلی */}
                            <div className="flex flex-col items-center justify-between ml-1 self-end text-center">
                                <div className="flex justify-between items-center">
                                    <div className="ml-2">
                                        <p className="text-green-400 mt-1 text-lg font-semibold">
                                            {formatPrice(product.discountedPrice)}
                                        </p>
                                    </div>
                                    <div className="text-black flex flex-col">
                                        <div className="flex justify-end">
                                            <p>ن</p> {/* تومان - بخش دوم */}
                                        </div>
                                        <div>
                                            <p>توما</p> {/* تومان - بخش اول */}
                                        </div>
                                    </div>
                                </div>

                                {/* نمایش قیمت قبل از تخفیف (خط‌خورده) */}
                                <p className="text-red-400 line-through ml-12 text-xs">
                                    {formatPrice(product.originalPrice)}
                                </p>
                            </div>
                        </div>

                        {/* دکمه افزودن به سبد خرید */}
                        <div className="mt-5">
                            <button
                                onClick={() => handleAddToCart(product)} // افزودن به سبد خرید
                                className="bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center w-40 h-10"
                                disabled={loading[product.id]} // غیرفعال شدن دکمه در حین لودینگ
                            >
                                {/* اگر در حال لود است، اسپینر نشان بده، در غیر اینصورت متن دکمه */}
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
