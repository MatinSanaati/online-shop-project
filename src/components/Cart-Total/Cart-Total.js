// Css--Imports
import '../../styles/Cart-Style/Cart-Style.css';

// React--Imports
import React, { useEffect, useState } from "react";

export const CartTotal = ({ cartItems }) => {
    const [total, setTotal] = useState(0);
    const [cartLength, setCartLength] = useState(0);

    useEffect(() => {
        const calculatedTotal = cartItems.reduce(
            (sum, item) => sum + item.price * (item.quantity || 1), 0);
        setTotal(calculatedTotal);
        setCartLength(cartItems.length);
    }, [cartItems]);

    return (
        <div className="cart_total p-6 w-full space-y-5">
            <h2 className="text-xl font-bold text-gray-800 mb-3 text-center relative">
                🛍 خلاصه سبد خرید
            </h2>

            <div className="print_number--items flex justify-between text-lg font-semibold text-gray-600">
                <span>تعداد کل کالا :</span>
                <span>{cartLength} عدد</span>
            </div>
            <div className="cart_bottom--wrapper">
                <div className="print_price--goods flex justify-between text-lg font-semibold text-gray-600">
                    <span>مجموع قیمت :</span>
                    <span className="text-green-600">{total.toLocaleString()} تومان</span>
                </div>

                <button className="btn_cart--total w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-5 hover:bg-blue-600 transition">
                    🛒 ادامه به پرداخت
                </button>
            </div>
        </div>
    );
};
