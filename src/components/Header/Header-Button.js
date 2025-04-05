// Style
import '../../styles/Page-Responsive/Home-Page-Responsive.css';
import '../../styles/Style-Blur-Box-Result/Style-Blur-Box-Result.css';
import '../../styles/Header-Button/Header-Button.css';

// Imports--React
import React, { useEffect, useState, } from "react";
import { ShoppingCart, Home, Search, LogIn } from 'lucide-react';
import { Link } from "react-router-dom";

// Imports--Components
import { SearchInputResult } from "./Search-Input-Result/Search-Input-Result";
import { Electronics } from '../Components-Hover-Nav/Electronics';
import { CarsAndMotorcycles } from '../Components-Hover-Nav/Cars-and-Motorcycles';
import { AudioVideo } from '../Components-Hover-Nav/Audio-Video';
import { Stationery } from '../Components-Hover-Nav/Stationery';
import { MenuButton } from './Menu-Button';
import { FaUser } from 'react-icons/fa';
// import { LoginForm } from "../Login-Form/Login-Form";

export const HeaderButton = ({ setIsSearching, setSearchFinished, setSelectedComponent }) => {
    const [text, setText] = useState("");
    const [inputDir, setInputDir] = useState("rtl");
    const [isFocused, setIsFocused] = useState(false);
    const [hideNav, setHideNav] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [cartItems, setCartItems] = useState([]); // وضعیت سبد خرید

    // تابع برای دریافت سبد خرید از localStorage
    const updateCart = () => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(savedCart);
    };

    const handleSearchClick = () => {
        console.log("دکمه جستجو کلیک شد!");
        setIsSearching(true);
        setSearchFinished(false);
        setIsButtonClicked(true);

        setTimeout(() => {
            setIsSearching(false);
            setSearchFinished(true);
            setIsButtonClicked(false);
        }, 3000);
    };

    const handleSelectResult = (resultName) => {
        setText(resultName);
        setIsFocused(false);
        if (isButtonClicked) {
            setIsButtonClicked(false);
        }
    };

    useEffect(() => {
        updateCart();

        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setHideNav(true);
            } else {
                setHideNav(false);
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // آپدیت سبد خرید هنگام تغییر در localStorage داخل همین صفحه
    useEffect(() => {
        const interval = setInterval(updateCart, 100);
        return () => clearInterval(interval);
    }, []);

    // Effect to disable/enable scroll when the search box is focused
    useEffect(() => {
        if (isFocused) {
            document.body.style.overflow = 'hidden'; // Disable scroll when focused
        } else {
            document.body.style.overflow = 'auto'; // Enable scroll when not focused
        }

        // Cleanup to reset the scroll when the component is unmounted
        return () => {
            document.body.style.overflow = 'auto'; // Ensure scroll is enabled on unmount
        };
    }, [isFocused]);

    const handleChange = (e) => {
        const value = e.target.value;
        setText(value);

        const isPersian = /[\u0600-\u06FF]/.test(value);
        const isEnglish = /[A-Za-z]/.test(value);

        if (isPersian) setInputDir("rtl");
        else if (isEnglish) setInputDir("ltr");
        else setInputDir("ltr");
    };

    const handleClear = () => {
        setText('');
    };

    return (
        <div className="w-full relative">
            {isFocused && (
                <div
                    className="fixed inset-0 bg-black/50 z-10 animate-blur-in"
                    onClick={() => setIsFocused(false)}
                ></div>
            )}

            <div className="flex flex-row items-center justify-between gap-6 p-6 bg-white w-full border-b-2 relative z-30">
                <div className="flex flex-row items-center gap-4">

                    {/* Menu_Nav_Bar */}
                    <MenuButton />

                    <div className="icon__home_header_right bg-white p-2.5 shadow-md rounded-lg">
                        <Link to="/" className="text-blue-500 hover:underline">
                            <Home className="w-5 h-5 text-blue-500" />
                        </Link>
                    </div>
                    <div className="flex items-center gap-3 mr-2 rounded-lg p-1 border-transparent bg-clip-padding bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                        <button className="transition-all duration-300 ease-out transform hover:scale-110 hover:text-blue-300 text-white rounded-full"
                            onClick={handleSearchClick}>
                            <Search className="w-8 h-8 mx-2" />
                        </button>
                        <div className="relative w-96 z-40">
                            <input
                                className="rounded-lg p-2 w-full text-gray-900 font-bold bg-white border-none outline-none border-b-2 border-transparent focus:border-green-500 focus:ring-0 transition-all duration-300"
                                value={text}
                                onChange={handleChange}
                                placeholder="جستجو کنید . . . !"
                                dir={inputDir}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                            />

                            {text && (
                                <button
                                    onClick={handleClear}
                                    className="absolute font-bold left-3 top-1/2 transform -translate-y-1/2 text-black transition duration-300 ease-in-out hover:scale-125"
                                >
                                    &#x2715;
                                </button>
                            )}

                            {isFocused && (
                                <div className="scroll-container absolute top-full w-full mt-2 bg-white shadow-md z-10 animate-fade-in">
                                    {text ? (
                                        <SearchInputResult
                                            searchQuery={text}
                                            onSelectResult={handleSelectResult} // ارسال تابع برای انتخاب نتیجه
                                            onSearchClick={handleSearchClick} // ارسال تابع کلیک به SearchInputResult
                                        />
                                    ) : (
                                        <div className="p-4 text-gray-400 text-center bg-white rounded-lg shadow-lg">
                                            محصول خود را اینجا پیدا کنید . . .
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-4">
                    <Link to="/Login-Form">
                        <button className="btn__login_signin bg-blue-500 flex flex-grow items-center justify-center text-white px-4 py-2 ml-7 rounded-lg hover:bg-blue-600">
                            <LogIn className="icon__login_signin w-5 h-5 ml-2" />
                            <span className='login-text'>
                                ثبت نام | ورود
                            </span>
                            <FaUser className="icon__login--signin w-5 h-5" />
                        </button>
                    </Link>

                    <div className="icon__card_header_left bg-white p-2.5 shadow-md rounded-lg items-center">
                        {cartItems.length > 0 && (
                            <span className="icon__card_count">{cartItems.length}</span>
                        )}
                        <Link to="/Cart" className="text-blue-500 hover:underline">
                            <ShoppingCart className="w-5 h-5 text-blue-500" />
                        </Link>
                    </div>
                </div>
            </div>

            <nav className={`menu_nav_bar w-full bg-gray-100 absolute border-t-2 p-4 flex items-center transition-all duration-300 z-20 ${hideNav ? 'opacity-0 -translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                <button className="relative">دسته بندی کالا ها</button>
                <ul className="flex justify-end items-center gap-9 my-0 mx-10 top-5 right-4 menu">
                    <li><Link to="/Electronics" element={<Electronics />} className="link text-gray-700 hover:text-blue-500">لپتاپ , موبایل , تبلت , کامپیوتر</Link></li>
                    <li><Link to="/CarsAndMotorcycles" element={<CarsAndMotorcycles />} className="link text-gray-700 hover:text-blue-500">خودرو و موتور سیکلت</Link></li>
                    <li><Link to="/AudioVideo" element={<AudioVideo />} className="link text-gray-700 hover:text-blue-500">صوتی و تصویری</Link></li>
                    <li><Link to="/Stationery" element={<Stationery />} className="link text-gray-700 hover:text-blue-500">لوازم تحریر</Link></li>
                </ul>
            </nav>
        </div>
    );
};
