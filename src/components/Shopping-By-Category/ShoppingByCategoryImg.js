// Styles__Component
import '../../styles/Shopping-By-Category/Shopping-By-Category.css';

// Photo_Imported
import MouseBox from '../../assets/img-section-Shopping-by-category/جعب ماوس.png';
import AppleCamera6 from '../../assets/img-section-Shopping-by-category/دوربین اپل 6.png';
import Camera from '../../assets/img-section-Shopping-by-category/دوربین.png';
import MassageChairButtons from '../../assets/img-section-Shopping-by-category/دکمه های صندلی ماساژور.png';
import Samsung from '../../assets/img-section-Shopping-by-category/سامسونگ.png';
import MassageChair from '../../assets/img-section-Shopping-by-category/صندلی ماساژور.png';
import WheeLchair__3 from '../../assets/img-section-Shopping-by-category/صندلی چرخ دار (3).png';
import WoodenWheelChair from '../../assets/img-section-Shopping-by-category/صندلی چرخ دار چوبی.png';
import WheelChair from '../../assets/img-section-Shopping-by-category/صندلی چرخ دار.png';
import WoodenChair from '../../assets/img-section-Shopping-by-category/صندلی چوبی.png';
import SungLasses_2 from '../../assets/img-section-Shopping-by-category/عینک آفتابی (2).png';
import CarTires from '../../assets/img-section-Shopping-by-category/لاستیک ماشین.png';
import Chandelier from '../../assets/img-section-Shopping-by-category/لوستر.png';
import LenovoLaptop from '../../assets/img-section-Shopping-by-category/لپتاپ لنوو.png';
import InchMonitor__27 from '../../assets/img-section-Shopping-by-category/مانیتور 27 اینچ.png';
import Mouse from '../../assets/img-section-Shopping-by-category/ماوس.png';
import YouPuttHeMobilePhoneHolderOnTheTable from '../../assets/img-section-Shopping-by-category/هولدر موبایل رو میزی.png';
import MobileHolder from '../../assets/img-section-Shopping-by-category/هولدر موبایل.png';
import ApplePhoneGlass from '../../assets/img-section-Shopping-by-category/گلس گوشی اپل.png';


const products = [
    { image: MouseBox, name: "جعبه ماوس" },
    { image: AppleCamera6, name: "دوربین اپل 6" },
    { image: Camera, name: "دوربین" },
    { image: MassageChairButtons, name: "دکمه‌های صندلی ماساژور" },
    { image: Samsung, name: "سامسونگ" },
    { image: MassageChair, name: "صندلی ماساژور" },
    { image: WheeLchair__3, name: "صندلی چرخ‌دار 3" },
    { image: WoodenWheelChair, name: "صندلی چرخ‌دار چوبی" },
    { image: WheelChair, name: "صندلی چرخ‌دار" },
    { image: WoodenChair, name: "صندلی چوبی" },
    { image: SungLasses_2, name: "عینک آفتابی 2" },
    { image: CarTires, name: "لاستیک ماشین" },
    { image: Chandelier, name: "لوستر" },
    { image: LenovoLaptop, name: "لپتاپ لنوو" },
    { image: InchMonitor__27, name: "مانیتور 27 اینچ" },
    { image: Mouse, name: "ماوس" },
    { image: YouPuttHeMobilePhoneHolderOnTheTable, name: "هولدر موبایل روی میز" },
    { image: MobileHolder, name: "هولدر موبایل" },
    { image: ApplePhoneGlass, name: "گلس گوشی اپل" }
];

export const ShoppingByCategoryImg = () => {
    return (
        <div className="relative z-0 grid gap-4 grid-rows-2 auto-cols-[minmax(150px,_1fr)] grid-flow-col w-full p-6 snap-x snap-mandatory cursor-grab">
            {products.map((product, index) => (
                <div key={index} className=" relative z-10 flex flex-col items-center justify-between p-4 snap-start">
                    <div className='product-image'>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-full shadow-md"
                        />
                    </div>
                    <div className='text-center'>
                        <p className="text-gray-700 font-medium">{product.name}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
