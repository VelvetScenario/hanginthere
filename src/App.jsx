import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login"; 
import MainFile from "./components/MainFile"; 
import CityAPI from "./components/pages/cityapi";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<CityAPI />} />

        <Route path="/MainFile" element={<MainFile />} />
      </Routes>
    </Router>
  );
}

export default App;
