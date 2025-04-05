// Style
import '../../styles/Page-Responsive/Home-Page-Responsive.css';

// React--Imports
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

export const Footer = () => {
    return (
        <footer className="footer bg-gray-200 rounded-lg text-black py-10 px-6 mt-16">
            <div className="footer_content max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Logo Section */}
                <button>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl font-bold text-blue-400"
                    >
                        MyShop
                    </motion.div>
                </button>

                {/* Navigation */}
                <motion.ul
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex space-x-6 text-sm mt-4 gap-3 md:mt-0"
                >
                    <li className="hover:text-blue-400 transition-all duration-300 cursor-pointer">Contact</li>
                    <li className="hover:text-blue-400 transition-all duration-300 cursor-pointer">Services</li>
                    <li className="hover:text-blue-400 transition-all duration-300 cursor-pointer">About</li>
                    <li className="hover:text-blue-400 transition-all duration-300 cursor-pointer">Home</li>
                </motion.ul>

                {/* Social Icons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="flex space-x-4 mt-4 md:mt-0"
                >
                    <FaFacebook className="text-xl hover:text-blue-500 transition-all duration-300 cursor-pointer" />
                    <FaTwitter className="text-xl hover:text-blue-400 transition-all duration-300 cursor-pointer" />
                    <FaInstagram className="text-xl hover:text-pink-500 transition-all duration-300 cursor-pointer" />
                    <FaLinkedin className="text-xl hover:text-blue-600 transition-all duration-300 cursor-pointer" />
                </motion.div>
            </div>

            {/* Bottom Text */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center text-gray-400 text-sm mt-8"
            >
                © 2025 MyBrand. All Rights Reserved.
            </motion.div>
        </footer>
    );
};
