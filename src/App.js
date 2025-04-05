// Import--React
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import--Components
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

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchFinished, setSearchFinished] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Router>
      <LoginHandler>
        <Header setIsSearching={setIsSearching} setSearchFinished={setSearchFinished} setSearchQuery={setSearchQuery} />
        <Routes>
          <Route
            path="/"
            element={<HomePage isSearching={isSearching} searchFinished={searchFinished} searchQuery={searchQuery} />}
          />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/Electronics" element={<Electronics />} />
          <Route path="/CarsAndMotorcycles" element={<CarsAndMotorcycles />} />
          <Route path="/AudioVideo" element={<AudioVideo />} />
          <Route path="/Stationery" element={<Stationery />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </LoginHandler>
    </Router>
  );
}

export default App;
