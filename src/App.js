import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";

// Import Components
import { HomePage } from "./components/pages/Home-Page";
import { Cart } from "./components/pages/Cart";
import { Header } from "./components/Header/Header";
import { LoginForm } from "./components/Login-Form/Login-Form";
import { Electronics } from "./components/Components-Hover-Nav/Electronics";
import { Stationery } from "./components/Components-Hover-Nav/Stationery";
import { CarsAndMotorcycles } from "./components/Components-Hover-Nav/Cars-and-Motorcycles";
import { AudioVideo } from "./components/Components-Hover-Nav/Audio-Video";
import { LoginHandler } from "./components/Login-Handler/Login-Handler";
import { Loading } from "./components/Loading/Loading";
import { NotFound } from "./components/Not-Found/Not-Found";

const RouteLoader = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000); // نمایش لودینگ به مدت 3 ثانیه

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  if (loading) return <Loading />;
  return children;
};

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchFinished, setSearchFinished] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // بعد از پاک شدن محتوا، لودینگ نشون بده و بعدش اپ رو نمایش بده
    const timeout = setTimeout(() => {
      setInitialLoading(false);
    }, 2000); // ابتدا 1 ثانیه خالی بمونه، بعد 1 ثانیه لودینگ نشون داده بشه (در کل 2 ثانیه)

    return () => clearTimeout(timeout);
  }, []);

  if (initialLoading) {
    return (
      <div id="app">
        {/* فاز اول: حذف محتوا */}
        {/* نمایش ندادن هیچ چیزی در ابتدا */}
        {/* بعد از 1 ثانیه: نمایش لودینگ */}
        <DelayedLoading delay={1000} />
      </div>
    );
  }

  return (
    <Router>
      <LoginHandler>
        <AppContent
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          setSearchFinished={setSearchFinished}
          searchFinished={searchFinished}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </LoginHandler>
    </Router>
  );
}

const DelayedLoading = ({ delay }) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return showLoading ? <Loading /> : null;
};

const AppContent = ({
  isSearching,
  setIsSearching,
  setSearchFinished,
  searchFinished,
  searchQuery,
  setSearchQuery,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // ریدایرکت به home اگر کاربر صفحه رو رفرش کرده باشه
  useEffect(() => {
    const isReload = performance.navigation.type === 1;
    if (isReload && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, []);

  const showHeader = location.pathname === "/" || location.pathname === "/Cart"; // ✅ اصلاح شرط

  return (
    <>
      {showHeader && (
        <Header
          id="header"
          setIsSearching={setIsSearching}
          setSearchFinished={setSearchFinished}
          setSearchQuery={setSearchQuery}
        />
      )}

      <div id="main-content">
        <RouteLoader>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  isSearching={isSearching}
                  searchFinished={searchFinished}
                  searchQuery={searchQuery}
                />
              }
            />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/LoginForm" element={<LoginForm />} />
            <Route path="/Electronics" element={<Electronics />} />
            <Route path="/CarsAndMotorcycles" element={<CarsAndMotorcycles />} />
            <Route path="/AudioVideo" element={<AudioVideo />} />
            <Route path="/Stationery" element={<Stationery />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RouteLoader>
      </div>
    </>
  );
};

export default App;
