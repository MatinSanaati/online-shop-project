// Style--Import
import '../../styles/Not-Found/Not-Found.css';

// React--Imports
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className="notfound-container min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-6">
            <div className="text-center">
                <div className="animated-404 text-[120px] md:text-[180px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                    404
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mt-4 animate-fadeIn">صفحه پیدا نشد!</h2>
                <p className="text-gray-500 mt-2 animate-fadeIn delay-2">صفحه‌ای که دنبالش بودی وجود نداره یا منتقل شده.</p>
                <Link to="/" className="inline-block mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 animate-fadeIn delay-4">
                    بازگشت به خانه
                </Link>
            </div>
        </div>
    );
};
