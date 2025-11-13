import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login"; 
import MainFile from "./components/MainFile"; 

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/MainFile" element={<MainFile />} />
      </Routes>
    </Router>
  );
}

export default App;
