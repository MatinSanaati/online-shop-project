// Style
import '../../styles//Footer/footer.css';

// React--Imports
import { FaInstagram, FaLinkedin, FaWhatsapp, FaTelegram, FaGithub } from "react-icons/fa";
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
                    <a
                        href="https://www.linkedin.com/in/matin-sanaati-86a514353/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                        className="hover:text-blue-700 transition-colors duration-300"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://github.com/MatinSanaati"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub"
                        className="hover:text-gray-800 transition-colors duration-300"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://www.instagram.com/m0011s.__js/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Instagram"
                        className="hover:text-pink-500 transition-colors duration-300"
                    >
                        <FaInstagram />
                    </a>
                    <a
                        href="https://wa.me/989050450901?text=سلام%20وقتتون%20بخیر"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="WhatsApp"
                        className="hover:text-green-500 transition-colors duration-300"
                    >
                        <FaWhatsapp />
                    </a>
                    <a
                        href="https://t.me/Matin0011S"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Telegram"
                        className="hover:text-sky-500 transition-colors duration-300"
                    >
                        <FaTelegram />
                    </a>
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
