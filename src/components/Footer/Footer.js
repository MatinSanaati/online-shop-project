// Style
import '../../styles//Footer/footer.css';

// React--Imports
import { FaInstagram, FaLinkedin, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { motion } from "framer-motion";

export const Footer = () => {
    return (
        <footer className="footer bg-gray-200 rounded-lg w-full text-black py-10 px-6 mt-16">
            {/* Container for footer content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="footer_content max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center"
            >
                {/* Logo Section */}
                <button>
                    <div className="text-2xl font-bold text-blue-400">
                        MyShop
                    </div>
                </button>

                {/* Navigation */}
                <motion.ul
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="section_links flex text-sm mt-4 gap-5 md:mt-0"
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
                    className="section_social flex justify-between items-center gap-5 mt-4 md:mt-0 text-xl"
                >
                    <FaLinkedin className="cursor-pointer hover:text-blue-700 transition-colors duration-300" title="LinkedIn" />
                    <FaInstagram className="cursor-pointer hover:text-pink-500 transition-colors duration-300" title="Instagram" />
                    <FaWhatsapp className="cursor-pointer hover:text-green-500 transition-colors duration-300" title="WhatsApp" />
                    <FaTelegram className="cursor-pointer hover:text-sky-500 transition-colors duration-300" title="Telegram" />
                </motion.div>
            </motion.div>

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
