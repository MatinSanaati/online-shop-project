import React, { useEffect } from "react";

export const ResearchProductList = ({ searchResults = [], searchQuery = "" }) => {
    useEffect(() => {
        console.log("لیست محصولات دریافتی:", searchResults);
        console.log("عبارت جستجو شده:", searchQuery);
    }, [searchResults, searchQuery]);

    // فیلتر محصولات بر اساس نام جستجو شده
    const filteredResults = searchResults.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!filteredResults || filteredResults.length === 0) {
        return (
            <div className="flex justify-center items-center mt-52">
                <p className="text-center text-gray-500 font-bold">
                    هیچ محصولی برای نمایش وجود ندارد.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-4 gap-4 mt-5 p-4">
            {filteredResults.map((item) => (
                <div key={item.id} className="p-4 border border-gray-900 rounded-md bg-white shadow-lg">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover rounded-md" />
                    <p className="text-lg font-semibold text-gray-800 mt-2">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.price}</p>
                    <button className="mt-4 py-2 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
                        افزودن به سبد خرید
                    </button>
                </div>
            ))}
        </div>
    );
};
