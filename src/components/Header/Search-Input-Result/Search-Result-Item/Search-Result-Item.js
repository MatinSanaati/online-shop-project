// Style
import '../../../../styles/Header-Button/Header-Button.css';

export const SearchResultItem = ({ productName, productCategory }) => {
    return (
        <div className="search_result_item p-2 hover:bg-gray-100 cursor-pointer rounded">
            <li className="">
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">{productName}</span>
                    <span className="text-sm text-gray-500">{productCategory}</span>
                </div>
            </li>
        </div>
    );
};
