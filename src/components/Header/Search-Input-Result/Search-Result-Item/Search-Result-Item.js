export const SearchResultItem = ({ productName, productCategory }) => {
    return (
        <li className="p-2 hover:bg-gray-100 cursor-pointer rounded">
            <div className="flex flex-col">
                <span className="font-semibold text-gray-800">{productName}</span>
                <span className="text-sm text-gray-500">{productCategory}</span>
            </div>
        </li>
    );
};
