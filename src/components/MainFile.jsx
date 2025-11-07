import { useState } from "react";
import { FiHome, FiMap, FiBell, FiSettings } from "react-icons/fi";

import Dashboard from "./Dashboard.jsx";
import Map from "./Map.jsx";
import Alerts from "./Alerts.jsx";
import Settings from "./Settings.jsx";

const MainFile = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const aqiData = [
    { location: "Metro Manila", aqi: 72, category: "High", forecast: [68, 70, 74, 80, 76] },
    { location: "Caloocan", aqi: 72, category: "Moderate", forecast: [68, 70, 74, 80, 76] },
    { location: "Valenzuela", aqi: 72, category: "Low", forecast: [68, 70, 74, 80, 76] },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-6 px-4 pb-24">
      <h1 className="text-lg font-semibold mb-3 text-center">{activeTab}</h1>

      {activeTab === "Dashboard" && <Dashboard aqiData={aqiData} />}
      {activeTab === "Map" && <Map />}
      {activeTab === "Alerts" && <Alerts />}
      {activeTab === "Settings" && <Settings />}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 flex justify-around py-2">
        {[
          { name: "Dashboard", icon: <FiHome size={20} /> },
          { name: "Map", icon: <FiMap size={20} /> },
          { name: "Alerts", icon: <FiBell size={20} /> },
          { name: "Settings", icon: <FiSettings size={20} /> },
        ].map((tab) => (
          <button
            key={tab.name}
            className={`flex flex-col items-center text-sm cursor-pointer ${
              activeTab === tab.name ? "text-white" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainFile;
