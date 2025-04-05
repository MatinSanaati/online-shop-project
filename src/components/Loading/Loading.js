// Style
import '../../styles/Loading/Loading.css';
export const Loading = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen bg-gray-900">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
    );
};