// ایمپورت‌های ضروری برای کامپوننت
import React, { useState } from "react"; // ری‌اکت و هوک useState برای مدیریت وضعیت
import { motion } from "framer-motion"; // برای افزودن انیمیشن
import { useNavigate } from "react-router-dom"; // برای هدایت بین صفحات
import { FaArrowLeft } from "react-icons/fa"; // آیکون فلش به چپ
import { products } from "../../components/Products-Component/Products-component"; // لیست محصولات
import { SuccessMessage } from "../../components/Components-Hover-Nav/Success-Message/Success-Message"; // پیام موفقیت

// تابع تبدیل عدد انگلیسی به فارسی
const toPersianDigits = (num) => {
    return num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
};

// تابع فرمت‌دهی قیمت با جداکننده سه‌رقمی
const formatPrice = (num) => {
    if (typeof num !== "number") return num;
    return num.toLocaleString("fa-IR").replace(/٬/g, "٬");
};

// کامپوننت اصلی
export const CarsAndMotorcycles = () => {
    const navigate = useNavigate(); // برای رفتن به صفحه دیگر
    const [loading, setLoading] = useState({}); // نگه‌داری وضعیت لود هر محصول
    const [showMessage, setShowMessage] = useState(false); // نمایش پیام موفقیت

    // فقط دسته‌بندی‌های مربوط به خودرو و موتور
    const categoryList = ["لوازم یدکی موتور", "لوازم یدکی خودرو"];

    // فیلتر محصولات بر اساس دسته‌بندی و محاسبه تخفیف
    const filteredProducts = products
        .filter(product => categoryList.includes(product.category)) // فیلتر بر اساس دسته‌بندی
        .map(product => {
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100); // درصد تخفیف
            const discountedPrice = Math.round(product.originalPrice - (product.originalPrice * discount) / 100); // قیمت با تخفیف
            return { ...product, discount, discountedPrice }; // الحاق تخفیف و قیمت نهایی به محصول
        });

    // تابع افزودن به سبد خرید
    const handleAddToCart = (product) => {
        setLoading(prev => ({ ...prev, [product.id]: true })); // فعال کردن لودینگ برای این محصول

        setTimeout(() => {
            setLoading(prev => ({ ...prev, [product.id]: false })); // پایان لودینگ بعد از ۳ ثانیه

            const existingCart = JSON.parse(localStorage.getItem("cart")) || []; // گرفتن سبد فعلی از localStorage
            const existingItem = existingCart.find(item => item.id === product.id); // بررسی وجود محصول در سبد

            let updatedCart;
            if (existingItem) {
                // اگر محصول وجود داشت، فقط تعدادش رو زیاد کن
                updatedCart = existingCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            } else {
                // اگر محصول جدید بود، اضافه کن با quantity = 1
                const newItem = {
                    ...product,
                    quantity: 1,
                    discountedPrice: Math.round(product.originalPrice - (product.originalPrice * product.discount) / 100)
                };
                updatedCart = [...existingCart, newItem];
            }

            localStorage.setItem("cart", JSON.stringify(updatedCart)); // ذخیره سبد در localStorage
            window.dispatchEvent(new Event("storage")); // ارسال رویداد برای آپدیت دیگر بخش‌ها

            setShowMessage(true); // نمایش پیام موفقیت
            setTimeout(() => setShowMessage(false), 5000); // مخفی کردن پیام بعد از ۵ ثانیه
        }, 3000);
    };

    // خروجی JSX
    return (
        <motion.div
            initial={{ opacity: 0, scale: .8, y: 10 }} // انیمیشن شروع
            animate={{ opacity: 1, scale: 1, y: 0 }} // انیمیشن هنگام نمایش
            transition={{ duration: 2, ease: "easeOut" }} // زمان و نوع انیمیشن
            className="flex flex-col items-center mt-10 h-full min-h-screen" // استایل صفحه
        >
            {/* نمایش پیام موفقیت در صورت نیاز */}
            {showMessage && <SuccessMessage show={showMessage} />}

            {/* دکمه بازگشت */}
            <button
                onClick={() => navigate("/")} // بازگشت به صفحه اصلی
                className="bg-blue-500 absolute left-10 top-[10%] -translate-y-1/2 text-white p-3 rounded-full shadow-md transition-all duration-300 group md:hover:bg-blue-600"
            >
                <FaArrowLeft size={20} className="transition-transform duration-300" />
            </button>

            {/* عنوان صفحه */}
            <h1 className="text-black text-xl font-bold tracking-wide text-right border-b-2 border-gray-300 pb-2 w-fit">
                خودرو و موتور سیکلت
            </h1>

            {/* نمایش لیست محصولات */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 gap-6 w-full max-w-8xl">
                {filteredProducts.map((product, index) => (
                    <div key={`${product.id}-${index}`} className="bg-white p-4 rounded-xl shadow-md mt-5 flex flex-col items-center 
                        transition-transform duration-200 ease-in 
                        md:hover:shadow-xl md:hover:scale-105"
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
                                            <p>ن</p> {/* نوشته برعکس "تومان" */}
                                        </div>
                                        <div>
                                            <p>توما</p>
                                        </div>
                                    </div>
                                </div>

                                {/* قیمت قبل از تخفیف */}
                                <p className="text-red-400 line-through ml-12 text-xs">{formatPrice(product.originalPrice)}</p>
                            </div>
                        </div>

                        {/* دکمه افزودن به سبد خرید */}
                        <div className="mt-5">
                            <button
                                onClick={() => handleAddToCart(product)} // افزودن به سبد
                                className="bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center w-40 h-10"
                                disabled={loading[product.id]} // اگر در حال لود شدن است، غیرفعال کن
                            >
                                {loading[product.id] ? (
                                    // نمایش اسپینر هنگام لودینگ
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
