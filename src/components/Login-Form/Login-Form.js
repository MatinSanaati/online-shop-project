// Styles
import '../../styles/Login-Form/Login-Form.css';

// Import--Reacts
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Import--Components
import { ErrorMessages } from './Login-Form-Error-Messages/Error-Messages';
import { RequiredFieldsWarning } from './Required-Fields-Warning/Required-Fields-Warning';

export const LoginForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [fullName, setFullName] = useState("");
    const [fullNameValid, setFullNameValid] = useState(null);
    const [phone, setPhone] = useState("");
    const [phoneValid, setPhoneValid] = useState(null);
    const [errors, setErrors] = useState([]);
    const [showRequiredWarning, setShowRequiredWarning] = useState(false);
    const [shakeName, setShakeName] = useState(false);
    const [shakePhone, setShakePhone] = useState(false);

    // fullName input class with conditional styling
    const fullNameInputClass = `
    w-full px-4 py-2 bg-white/20 backdrop-blur-md border-none outline-none rounded-xl text-white placeholder-gray-300
    ${fullNameValid === false ? "ring-2 ring-red-400" :
            fullNameValid === true ? "ring-2 ring-green-400" : "focus:ring-2 focus:ring-blue-300"}
    ${shakeName ? "shake" : ""}
`;

    const phoneInputClass = `
    w-full px-4 py-2 bg-white/20 backdrop-blur-md border-none outline-none rounded-xl text-white placeholder-gray-300
    ${phoneValid === false ? "ring-2 ring-red-400" :
            phoneValid === true ? "ring-2 ring-green-400" : "focus:ring-2 focus:ring-blue-300"}
    ${shakePhone ? "shake" : ""}
`;

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const handleFullNameChange = (e) => {
        const value = e.target.value;
        setFullName(value);

        if (value.trim() === "") {
            setFullNameValid(null);
        } else {
            const words = value.trim().split(/\s+/);
            const isValid = words.length >= 2 && words.every(w => w.length >= 3); // 👈 شرط اصلی
            setFullNameValid(isValid);
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhone(value);

        if (value.trim() === "") {
            setPhoneValid(null);
        } else {
            const isValid = /^09\d{9}$/.test(value.trim()); // 👈 چک دقیق
            setPhoneValid(isValid);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isNameEmpty = fullName.trim() === "";
        const isPhoneEmpty = phone.trim() === "";

        // استفاده از همون شروطی که توی handleChange استفاده کردیم
        const words = fullName.trim().split(/\s+/);
        const isFullNameValid = words.length >= 2 && words.every(w => w.length >= 3);
        const isPhoneValid = /^09\d{9}$/.test(phone.trim());

        const newErrors = [];

        if (isNameEmpty || isPhoneEmpty) {
            setShowRequiredWarning(true);
            if (isNameEmpty) {
                setShakeName(true);
                setTimeout(() => setShakeName(false), 500);
            }
            if (isPhoneEmpty) {
                setShakePhone(true);
                setTimeout(() => setShakePhone(false), 500);
            }

            setTimeout(() => setShowRequiredWarning(false), 3000);
            return;
        }

        if (!isFullNameValid) {
            newErrors.push("نام کامل باید حداقل شامل دو کلمه با حداقل ۳ حرف باشه");
            setShakeName(true);
            setTimeout(() => setShakeName(false), 500);
        }

        if (!isPhoneValid) {
            newErrors.push("شماره تلفن باید با 09 شروع بشه و ۱۱ رقم باشه");
            setShakePhone(true);
            setTimeout(() => setShakePhone(false), 500);
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            setTimeout(() => setErrors([]), 5000);
        } else {
            setErrors([]);
            console.log("ثبت‌نام موفقیت‌آمیز بود ✅");
        }
    };

    const formVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -40, scale: 0.95 }
    };

    return (
        <div>
            <div>

                {showRequiredWarning && <RequiredFieldsWarning />}

                {/* Error Messages Display */}
                <ErrorMessages errors={errors} />

            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="flex w-full items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500"
            >
                {isVisible && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isRegister ? "register" : "login"}
                            variants={formVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="login-form-wrapper bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-lg max-w-sm w-full border border-white/20"
                        >
                            <h2 className="text-3xl font-extrabold text-white text-center mb-8">
                                {isRegister ? "ثبت‌ نام" : "ورود"}
                            </h2>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {isRegister && (
                                    <div>
                                        <label className="block text-white font-medium mb-1">نام کامل</label>
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={handleFullNameChange}
                                            className={fullNameInputClass}
                                            placeholder="نام و نام خانوادگی . . ."
                                        />
                                        {fullNameValid === false && fullName !== "" && (
                                            <p className="warning_text text-sm text-red-300 mt-1 text-center">
                                                نام کاربری معتبر نیست 😑
                                            </p>
                                        )}
                                        {fullNameValid === true && fullName !== "" && (
                                            <p className="text-sm text-green-300 mt-1 text-center">
                                                نام کاربری کامل است 😊
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-white font-medium mb-1">شماره تلفن</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        className={phoneInputClass}
                                        placeholder="09XXXXXXXXX"
                                    />
                                    {phoneValid === false && phone !== "" && (
                                        <p className="warning_text text-sm text-red-300 mt-1 text-center">
                                            شماره تلفن معتبر نیست 😑
                                        </p>
                                    )}
                                    {phoneValid === true && phone !== "" && (
                                        <p className="text-sm text-green-300 mt-1 text-center">
                                            شماره تلفن معتبر است 😊
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl shadow-md hover:scale-105 cursor-pointer transition-transform duration-300"
                                >
                                    {isRegister ? "ثبت‌ نام" : "ورود"}
                                </button>

                            </form>

                            <p className="text-white text-center mt-6 text-sm">
                                {isRegister ? (
                                    <>
                                        قبلاً ثبت‌ نام کردید؟{" "}
                                        <button
                                            onClick={() => setIsRegister(false)}
                                            className="text-yellow-300 font-bold hover:underline"
                                        >
                                            ورود به حساب
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        حساب کاربری ندارید؟{" "}
                                        <button
                                            onClick={() => setIsRegister(true)}
                                            className="text-yellow-300 font-bold hover:underline"
                                        >
                                            ثبت‌ نام کنید
                                        </button>
                                    </>
                                )}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                )}
            </motion.div>
        </div>
    );
};
