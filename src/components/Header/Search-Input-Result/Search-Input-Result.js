// React--Imports
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import--Components
import { products } from '../../Products-Component/Products-component';

export const SearchInputResult = ({ searchQuery, onSelectResult, isButtonClicked, onSearchResults }) => {
    const [showBox, setShowBox] = useState(false);
    const [boxContent, setBoxContent] = useState("");

    useEffect(() => {
        if (isButtonClicked && searchQuery.trim()) {
            setShowBox(true);
            setBoxContent(`شما جستجو کردید: ${searchQuery}`);
        } else {
            setShowBox(false);
        }
    }, [isButtonClicked, searchQuery]);

    // بررسی مقدار ورودی و فیلتر کردن نتایج
    const filteredResults = (searchQuery && typeof searchQuery === "string" ? searchQuery.trim() : "")
        ? products.filter(item => item.name?.toLowerCase().includes(searchQuery.trim().toLowerCase()))
        : [];

    useEffect(() => {
        if (typeof onSearchResults === "function") {
            onSearchResults(filteredResults);
        }
        // حذف onSearchResults از آرایه وابستگی‌ها
    }, [filteredResults, onSearchResults]);


    const handleResultClick = (resultName) => {
        onSelectResult(resultName); // ارسال نام نتیجه انتخابی به والد
        setShowBox(false);
    };

    // Render
    return (
        <div className="relative w-full">
            {/* متن نتایج جست و جو */}
            {showBox && (
                <motion.div
                    className="fixed bottom-10 left-1/2 transform -translate-x-1/2 p-4 w-80 text-center bg-white shadow-md rounded-md"
                >
                    <p className="text-lg font-semibold">{boxContent}</p>
                </motion.div>
            )}

            {/* لیست نتایج جستجو */}
            {searchQuery.trim() && (
                <motion.div
                    className="absolute top-full z-50 left-0 w-full max-h-52 overflow-y-auto bg-white shadow-lg rounded-lg border border-gray-200 p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ul>
                        {filteredResults.length > 0 ? (
                            filteredResults.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => handleResultClick(item.name)}
                                    className="p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100 transition"
                                >
                                    <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.category}</p>
                                </li>
                            ))
                        ) : (
                            <li className="p-4 text-gray-500 font-bold text-center">هیچ موردی یافت نشد . . . !</li>
                        )}
                    </ul>
                </motion.div>
            )}
        </div>
    );
};
