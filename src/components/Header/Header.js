
import '../../styles/Header/Header.css';
import React from "react";
import { HeaderButton } from "./Header-Button";
import { motion } from "framer-motion";

export const Header = ({ setIsSearching, setSearchFinished }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="section__header bg-white fixed top-0 left-0 right-0 w-full z-10 flex flex-col items-center justify-between"
        >
            <HeaderButton setIsSearching={setIsSearching} setSearchFinished={setSearchFinished} />
        </motion.div>
    );
};
