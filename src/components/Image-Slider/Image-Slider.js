import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // اضافه کردن آیکون‌ها

// Styles
import '../../styles/Image-Slider-Style/Image-Slider.css';
import '../../styles/Image-Slider-Style/Image-Slider-Animation-Hover/Image-Slider-Animation-Hover.css';

// Image
import image_1 from '../../assets/Img-For-Slider-Header/استند مانیتور__1.png';
import image_2 from '../../assets/Img-For-Slider-Header/استند مانیتور__2.png';
import image_3 from '../../assets/Img-For-Slider-Header/تاچ پد اکسترنال.png';
import image_4 from '../../assets/Img-For-Slider-Header/دوربین اپل 6.png';
import image_5 from '../../assets/Img-For-Slider-Header/ساعت مچی.png';
import image_6 from '../../assets/Img-For-Slider-Header/سامسونگ.png';
import image_7 from '../../assets/Img-For-Slider-Header/دوربین.png';
import image_8 from '../../assets/Img-For-Slider-Header/صندلی ماساژور.png';
import image_9 from '../../assets/Img-For-Slider-Header/صندلی چرخ دار (2).png';
import image_10 from '../../assets/Img-For-Slider-Header/گلس گوشی اپل.png';
import image_11 from '../../assets/Img-For-Slider-Header/کیف لپتاپ.png';
import image_12 from '../../assets/Img-For-Slider-Header/هولدر موبایل.png';
import image_13 from '../../assets/Img-For-Slider-Header/هولدر موبایل رو میزی.png';
import image_14 from '../../assets/Img-For-Slider-Header/هودی آبی__1.png';
import image_15 from '../../assets/Img-For-Slider-Header/ماوس.png';

const images = [image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, image_11, image_12, image_13, image_14, image_15];

// Return
export const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 5000); // هر 5 ثانیه یک بار اسلاید می‌کند

        return () => clearInterval(interval); // پاک‌سازی تایمر برای جلوگیری از مشکلات
    }, []);

    return (
        <div className="slider-container relative">
            {/* دکمه فلش چپ */}
            <button
                onClick={prevImage}
                className="fi_chevron_left absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition duration-300"
            >
                <FiChevronLeft size={30} />
            </button>

            <div className="image-wrapper">
                <div
                    className="slider-track"
                    style={{
                        transform: `translateX(${(images.length - 1 - currentIndex) * 100}%)`,
                        transition: "transform 1s ease-in-out",
                        width: `${images.length * 100}%`,
                    }}
                >
                    {images.map((img, index) => (
                        <div key={index} className="slide">
                            <img src={img} alt={`Slide ${index}`} className="slider-image" />
                        </div>
                    ))}
                </div>
            </div>

            {/* دکمه فلش راست */}
            <button
                onClick={nextImage}
                className="fi_chevron_right absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition duration-300"
            >
                <FiChevronRight size={30} />
            </button>
        </div>
    );
};
