import React, { useState, useRef, useEffect } from "react";

export const DraggableItem = ({ children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const sliderRef = useRef(null);

    useEffect(() => {
        if (isDragging) {
            document.body.style.cursor = "grabbing";
        } else {
            document.body.style.cursor = "auto";
        }
    }, [isDragging]);

    const onMouseDown = (e) => {
        if (!sliderRef.current) return;
        e.preventDefault();
        setIsDragging(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
        document.body.style.userSelect = "none";
    };

    const onMouseMove = (e) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
        setIsDragging(false);
        document.body.style.userSelect = "auto";
        document.body.style.cursor = "auto";
    };

    const onMouseLeave = onMouseUp;

    return (
        <div
            ref={sliderRef}
            className="select-none overflow-x-auto flex space-x-4"
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
        >
            {React.Children.map(children, (child) =>
                React.cloneElement(child, {
                    style: { pointerEvents: isDragging ? "none" : "auto" },
                })
            )}
        </div>
    );
};
