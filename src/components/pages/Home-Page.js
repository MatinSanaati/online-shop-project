// Style
import '../../styles/Section__Product_List/Section__Product_List.css';

// Imports--React
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Component__Imports
import { ImageSlider } from '../Image-Slider/Image-Slider';
import { ProductList } from '../Product-List/Product-List';
import { Draggable } from '../Draggable/Draggable';
import { ShoppingByCategory } from '../Shopping-By-Category/ShoppingByCategory';
import { Footer } from '../Footer/Footer';
import { Loading } from '../Loading/Loading';

export const HomePage = ({ isSearching, searchFinished, searchQuery }) => {
    const [boxContent, setBoxContent] = useState('');
    const [showBox, setShowBox] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    useEffect(() => {
        if (searchQuery && searchFinished) {
            setBoxContent(`نتایج جستجوی شما: "${searchQuery}"`);
            setShowBox(true);
            setTimeout(() => {
                setShowBox(false);
            }, 3000);
        }
    }, [searchQuery, searchFinished]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="p-8 mt-8"
        >
            {isSearching ? (
                <Loading />
            ) : searchFinished ? (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-center text-xl font-bold mt-44 text-blue-500">
                        نتیجه‌ی جستجو . . .
                    </h2>

                    {/* نتایج جستجو */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                        {searchResults.length > 0 ? (
                            searchResults.map((item) => (
                                <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                                    <h3 className="text-lg font-bold">{item.name}</h3>
                                    <p className="text-sm text-gray-600">{item.category}</p>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 font-bold mt-6">
                                محصولی  پیدا نشد . . . !
                            </div>
                        )}
                    </div>
                </motion.div>
            ) : (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <ImageSlider />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <div className="section__product_list w-full mx-auto overflow-x-auto h-auto mt-40 rounded-lg cursor-grab">
                            <div className='h3_parent mb-4 text-3xl text-center font-bold'>
                                <h3>محصولات</h3>
                            </div>
                            <Draggable>
                                <ProductList />
                            </Draggable>
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <div className="shopping_by_category text-lg text-center mt-12 font-bold text-gray-800">
                            <ShoppingByCategory />
                        </div>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.10 }}
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <Footer />
                    </motion.div>
                </>
            )}

            {showBox && (
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-100 border border-gray-300 rounded-lg p-4 w-80 text-center">
                    <p className="text-lg font-semibold">{boxContent}</p>
                </div>
            )}
        </motion.div>
    );
};
