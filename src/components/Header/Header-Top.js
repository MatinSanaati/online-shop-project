// React--Imports
import React, { useEffect, useRef, useState } from 'react';

// Style
import '../../styles/Page-Responsive/Home-Page-Responsive.css';
import '../../styles/Header-Top/Header-Top.css';
import '../../styles/Animations-css/Animation-header.css';

export const HeaderTop = () => {
    const [startTimer, setStartTimer] = useState(false);
    const p1Ref = useRef(null);
    const p2Ref = useRef(null);
    const p3Ref = useRef(null);

    useEffect(() => {
        const autoStartTimer = setTimeout(() => {
            setStartTimer(true);
        }, 3000);

        return () => {
            clearTimeout(autoStartTimer);
        };
    }, []);

    useEffect(() => {
        if (!startTimer) return;

        const firstScroll = setTimeout(() => {
            if (p1Ref.current) {
                p1Ref.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }, 7000);

        const secondScroll = setTimeout(() => {
            if (p2Ref.current) {
                p2Ref.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }, 10000);

        const thirdScroll = setTimeout(() => {
            if (p3Ref.current) {
                p3Ref.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }, 13000);

        return () => {
            clearTimeout(firstScroll);
            clearTimeout(secondScroll);
            clearTimeout(thirdScroll);
        };
    }, [startTimer]);

    return (
        <div className="section__header_top flex flex-row justify-between items-center w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg">
            <div className="box__text_hi">
                <span className="text__hi text-lg font-bold">
                    سلام . . . !
                </span>
            </div>
            <div className="box__parent_p flex flex-col gap-2">
                <p
                    ref={p1Ref}
                    className="text-lg font-bold text-white px-3 py-1 pl-80 rounded-lg"
                >
                    ❤️سلام به وبسایت خودتون خوش آمدید❤️
                </p>
                <p
                    ref={p2Ref}
                    className="text-lg font-bold text-white px-3 py-1 pl-80 rounded-lg"
                >
                    اینجا با یک کلیک میتونی هرچی دلت میخواد رو بخری . . . !
                </p>
                <p
                    ref={p3Ref}
                    className="text-lg font-bold text-white px-3 py-1 pl-80 rounded-lg"
                >
                    پس دست به کار شو . . . .
                </p>
            </div>

            <div className="box__text__my_shop flex items-center">
                <h1 className="text__my_shop text-2xl font-extrabold">My Shop</h1>
            </div>
        </div>
    );
};
