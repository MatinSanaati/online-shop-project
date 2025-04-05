import React, { useState, useRef } from "react";

export const Draggable = ({ children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const sliderRef = useRef(null);

    const onMouseDown = (e) => {
        if (!sliderRef.current) return;
        e.preventDefault(); // جلوگیری از انتخاب محتوای داخلی
        setIsDragging(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
        document.body.style.userSelect = "none"; // جلوگیری از انتخاب متن
    };

    const onMouseLeave = () => {
        setIsDragging(false);
        document.body.style.userSelect = "auto";
    };

    const onMouseUp = () => {
        setIsDragging(false);
        document.body.style.userSelect = "auto";
    };

    const onMouseMove = (e) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2; // مقدار حرکت ماوس
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div
            ref={sliderRef}
            className="cursor-grab active:cursor-grabbing select-none overflow-x-auto flex space-x-4"
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
        >
            {/* جلوگیری از انتخاب عکس‌ها */}
            {React.Children.map(children, (child) =>
                React.cloneElement(child, {
                    style: { pointerEvents: isDragging ? "none" : "auto" },
                })
            )}
        </div>
    );
};
