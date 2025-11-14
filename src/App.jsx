import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login"; 
import MainFile from "./components/MainFile"; 
import CityAPI from "./components/pages/cityapi";
import AQIRouteMap from "./components/AQIRouteMap";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/MainFile" element={<MainFile />} />
      </Routes>
    </Router>
  );
  // return <AQIRouteMap startPSGC={"1380100135"} endPSGC={"1380100177"} />;
}

export default App;
