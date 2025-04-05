import React from 'react';
import { ProductItem } from './Product-Item';

import laptopImg from "../../assets/Img-Section-Product/استند مانیتور__1.png";
import mobileImg from "../../assets/Img-Section-Product/استند مانیتور__2.png";
import headphoneImg from "../../assets/Img-Section-Product/جعب ماوس.png";
import smartwatchImg from "../../assets/Img-Section-Product/ساعت مچی.png";
import massageChair from "../../assets/Img-Section-Product/صندلی ماساژور.png";
import Wheelchair__2 from "../../assets/Img-Section-Product/صندلی چرخ دار (2).png";
import WoodenWheelchair from "../../assets/Img-Section-Product/صندلی چرخ دار چوبی.png";
import WoodenChairWithWheels from "../../assets/Img-Section-Product/صندلی چوبی چرخدار.png";
import Sunglasses__2 from "../../assets/Img-Section-Product/عینک آفتابی (2).png";
import SamsungLogo from "../../assets/Img-Section-Product/لوگوی سامسونگ.png";
import LenovoLaptop from "../../assets/Img-Section-Product/لپتاپ لنوو.png";
import GreenHoodieBrand from "../../assets/Img-Section-Product/مارک هودی سبز.png";
import InchMonitor__27 from "../../assets/Img-Section-Product/مانیتور 27 اینچ.png";
import Mouse from "../../assets/Img-Section-Product/ماوس.png";
import BlueHoodie__1 from "../../assets/Img-Section-Product/هودی آبی__1.png";
import GreenHoodie from "../../assets/Img-Section-Product/هودی سبز.png";
import MobileHolder from "../../assets/Img-Section-Product/هولدر موبایل.png";
import Keyboard from "../../assets/Img-Section-Product/کیبورد.png";
import LaptopBag from "../../assets/Img-Section-Product/کیف لپتاپ.png";


const products = [
    { id: 1, name: "استند پشت مانیتور", price: "800,000", imageUrl: laptopImg },
    { id: 2, name: "استند پشت مانیتور", price: "1,200,000", imageUrl: mobileImg },
    { id: 3, name: "بسته بندی ماوس", price: "1,500,000", imageUrl: headphoneImg },
    { id: 4, name: "ساعت هوشمند", price: "30,000,000", imageUrl: smartwatchImg },
    { id: 5, name: "صندلی ماساژور", price: "100,000,000", imageUrl: massageChair },
    { id: 6, name: "صندلی چرخ دار", price: "8,000,000", imageUrl: Wheelchair__2 },
    { id: 7, name: "صندلی چرخ دار چوبی", price: "5,000,000", imageUrl: WoodenWheelchair },
    { id: 8, name: "صندلی چرخ دار چوبی", price: "3,000,000", imageUrl: WoodenChairWithWheels },
    { id: 9, name: "عینک آفتابی طبی", price: "15,000,000", imageUrl: Sunglasses__2 },
    { id: 10, name: "لوگوی سامسونگ", price: "30,000,000", imageUrl: SamsungLogo },
    { id: 11, name: "لپتاپ لنوو", price: "80,000,000", imageUrl: LenovoLaptop },
    { id: 12, name: "هودی سبز", price: "800,000", imageUrl: GreenHoodieBrand },
    { id: 12, name: "مانیتور 27 اینچ", price: "12,000,000", imageUrl: InchMonitor__27 },
    { id: 12, name: "ماوس", price: "2,000,000", imageUrl: Mouse },
    { id: 12, name: "هودی آبی", price: "500,000", imageUrl: BlueHoodie__1 },
    { id: 12, name: "هودی سبز", price: "480,000", imageUrl: GreenHoodie },
    { id: 12, name: "هولدر موبایل", price: "500,000", imageUrl: MobileHolder },
    { id: 12, name: "کیبورد", price: "5,000,000", imageUrl: Keyboard },
    { id: 12, name: "کیف لپتاپ", price: "3,000,000", imageUrl: LaptopBag },
];
export const ProductList = () => {
    return (
        <div className="flex justify-between items-center">
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    );
};