// Style
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <div className="header_button w-full relative border-b-2">
            {isFocused && (
                <div
                    className="fixed inset-0 bg-black/50 z-10 animate-blur-in"
                    onClick={() => setIsFocused(false)}
                ></div>
            )}

            <div className="flex flex-row items-center justify-between gap-6 p-6 w-full relative z-30">
                <div className="section_right flex flex-row items-center gap-4">

                    {/* Menu_Nav_Bar */}
                    <MenuButton onClick={() => setIsMobileMenuOpen(prev => !prev)} />

                    <div className="icon__home_header_right p-2.5 shadow-md rounded-lg">
                        <Link to="/" className="text-blue-500 hover:underline">
                            <Home className="w-5 h-5 text-blue-500" />
                        </Link>
                    </div>
                    <div className="search_container flex items-center gap-3 mr-2 rounded-lg p-1 border-transparent bg-clip-padding bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                        <button className="transition-all duration-300 ease-out transform hover:scale-110 hover:text-blue-300 text-white rounded-full"
                            onClick={handleSearchClick}>
                            <Search className="icon_search w-8 h-8 mx-2" />
                        </button>
                        <div className="input relative w-96 z-40">
                            <input
                                className="search_input rounded-lg p-2 w-[90%] text-gray-900 font-bold bg-white border-none outline-none border-b-2 border-transparent focus:border-green-500 focus:ring-0 transition-all duration-300"
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
                                    className="btn_clear--content--input absolute font-bold left-2.5 top-1/2 transform -translate-y-1/2 text-black transition duration-300 ease-in-out hover:scale-125"
                                >
                                    &#x2715;
                                </button>
                            )}

                            {isFocused && (
                            <div className="scroll-container bg-white shadow-md rounded-md z-10 animate-fade-in md:absolute md:top-full md:w-full top-20 fixed left-0 w-screen md:h-auto md:rounded-md md:mt-2">
                                {text ? (
                                    <SearchInputResult
                                        searchQuery={text}
                                        onSelectResult={handleSelectResult} // ارسال تابع برای انتخاب نتیجه
                                        onSearchClick={handleSearchClick} // ارسال تابع کلیک به SearchInputResult
                                    />
                                ) : (
                                    <div className="p-4 text-gray-600 text-center bg-white rounded-lg shadow-lg">
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
                            <span className='login_text'>
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

            <nav className={`menu_nav_bar w-full bg-slate-100 absolute p-2 flex items-center transition-all duration-300 z-20 ${hideNav ? 'opacity-0 -translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                <button className="relative">دسته بندی کالا ها</button>
                <ul className="flex justify-end items-center gap-9 my-0 mx-10 top-5 right-4 menu">
                    <li><Link to="/Electronics" element={<Electronics />} className="link text-gray-700 hover:text-blue-500">لپتاپ , موبایل , تبلت , کامپیوتر</Link></li>
                    <li><Link to="/CarsAndMotorcycles" element={<CarsAndMotorcycles />} className="link text-gray-700 hover:text-blue-500">خودرو و موتور سیکلت</Link></li>
                    <li><Link to="/AudioVideo" element={<AudioVideo />} className="link text-gray-700 hover:text-blue-500">صوتی و تصویری</Link></li>
                    <li><Link to="/Stationery" element={<Stationery />} className="link text-gray-700 hover:text-blue-500">لوازم تحریر</Link></li>
                </ul>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="menu_nav_bar--mobile animate-slide-in fixed top-0 right-0 w-1/4 h-screen bg-white shadow-lg z-50 p-6 flex flex-col gap-6 transition-all duration-300 md:hidden">
                    <button
                        className="self-end text-red-500 font-bold text-xl p-2 rounded-md shadow-md transition-transform duration-300 hover:scale-110"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        ×
                    </button>

                    <Link
                        to="/"
                        className="flex items-start justify-start mt-7 gap-2 text-blue-500 transition-transform duration-300 hover:scale-105"
                    >
                        <Home className="w-5 h-5" />
                    </Link>

                    <Link
                        to="/Cart"
                        className="flex items-start justify-start mt-5 gap-2 text-blue-500 relative transition-transform duration-300 hover:scale-105"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        {cartItems.length > 0 && (
                            <span className="absolute top-0 right-[-10px] bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{cartItems.length}</span>
                        )}
                    </Link>

                    <div className="flex flex-col gap-3 mt-5">
                        <Link
                            to="/Electronics"
                            className="text-gray-700 hover:text-blue-500 transition-transform duration-300 hover:scale-105"
                        >
                            کالای دیجیتال
                        </Link>
                        <Link
                            to="/CarsAndMotorcycles"
                            className="text-gray-700 hover:text-blue-500 transition-transform duration-300 hover:scale-105"
                        >
                            خودرو و موتورسیکلت
                        </Link>
                        <Link
                            to="/AudioVideo"
                            className="text-gray-700 hover:text-blue-500 transition-transform duration-300 hover:scale-105"
                        >
                            صوتی و تصویری
                        </Link>
                        <Link
                            to="/Stationery"
                            className="text-gray-700 hover:text-blue-500 transition-transform duration-300 hover:scale-105"
                        >
                            لوازم تحریر
                        </Link>
                    </div>
                </div>
            )}

        </div>
    );
};
