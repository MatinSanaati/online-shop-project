// Import--React
import React from "react";

// Import--Style
import '../../styles/Header-Button/Header-Button.css';

export const MenuButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="menu__button p-2.5 flex flex-col justify-between items-start bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 transition duration-300">
            <div className="line line_1 w-2 h-1 bg-white mb-1"></div>
            <div className="line line_2 w-4 h-1 bg-white mb-1"></div>
            <div className="line line_3 w-6 h-1 bg-white"></div>
        </button>
    );
};
