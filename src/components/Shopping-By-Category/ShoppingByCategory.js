// Style
import '../../styles/Shopping-By-Category/Shopping-By-Category.css';

import { DraggableItem } from "./DraggableItem";
import { ShoppingByCategoryImg } from "./ShoppingByCategoryImg";

export const ShoppingByCategory = () => {
    return (
        <div className="category w-full mx-auto mt-32">
            <div className='h3_parent mb-4 text-3xl text-center font-bold'>
                <h3>خرید بر اساس دسته بندی</h3>
            </div>
            <DraggableItem>
                <ShoppingByCategoryImg />
            </DraggableItem>
        </div>
    );
};
