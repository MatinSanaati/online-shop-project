// Import--React
import React from "react";

// Import--Style
import '../../styles/Page-Responsive/Home-Page-Responsive.css';
import '../../styles/Header-Button/Menu-Button.css';

export const MenuButton = () => {
    return (
        <button className="menu__button p-3 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 transition duration-300">
            <div className="w-2 h-1 bg-white mb-1"></div>
            <div className="w-4 h-1 bg-white mb-1"></div>
            <div className="w-6 h-1 bg-white"></div>
        </button>
    );
};
