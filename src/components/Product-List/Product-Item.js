import React from 'react';
export const ProductItem = ({ product }) => {
    return (
        <div className="mr-16 border-b-2 pb-2 flex flex-col items-center text-center w-auto h-auto">
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-40 h-36 object-cover rounded-md"
            />

            {/* نام محصول و قیمت‌ها در یک ردیف */}
            <div className="flex flex-col justify-between text-center items-center mt-2 w-40 h-auto px-2">
                <h3 className="text-lg font-bold">{product.name}</h3>

                <div className="w-full mt-3 flex flex-row justify-between items-center">

                    {/* نمایش درصد تخفیف */}
                    <div>
                        <span className="bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                            % {product.discount}35
                        </span>
                    </div>

                    <div className='flex items-center justify-between text-left w-20'>

                        <div className='flex flex-col items-center'>
                            <p className="text-green-500 font-bold text-sm">{product.price}</p>
                            <p className="text-slate-300 text-sm">
                                <del>{product.oldPrice}200,000</del>
                            </p>
                        </div>

                        <div className='max-w-6'>
                            <p className="text-green-500 font-bold text-sm">ن</p>
                            <p className="text-green-500 font-bold text-sm">توما</p>
                        </div>

                    </div>

                </div>
            </div>
        </div >
    );
};