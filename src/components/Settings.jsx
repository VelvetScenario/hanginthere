import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Settings = ({
  darkMode: initialDarkMode = true,
  onThemeChange,
  alertThreshold: initialThreshold = "Moderate",
  onThresholdChange,
}) => {
  const [darkMode, setDarkMode] = useState(initialDarkMode);
  const [alertThreshold, setAlertThreshold] = useState(initialThreshold);
  const navigate = useNavigate();

  useEffect(() => {
    if (onThemeChange) onThemeChange(darkMode ? "dark" : "light");
  }, [darkMode, onThemeChange]);

  useEffect(() => {
    if (onThresholdChange) onThresholdChange(alertThreshold);
  }, [alertThreshold, onThresholdChange]);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div
      className={`w-full max-w-3xl mx-auto p-4 flex flex-col gap-6 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">Settings</h2>

      {/* Dark Mode Toggle */}
      <div
        className={`flex items-center justify-between p-4 rounded-xl ${
          darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
        }`}
      >
        <span>Dark Mode</span>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="w-5 h-5 accent-green-500"
        />
      </div>

      {/* Credit Box */}
      <div
        className={`flex flex-col p-3 rounded-xl ${
          darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
        }`}
      >
        <span>Barangay Data was collected by Dane Christian Belarmino</span>
      </div>

      {/* Alert Threshold */}
      <div
        className={`flex flex-col p-4 rounded-xl ${
          darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
        }`}
      >
        <label className="mb-2">Alert Threshold</label>
        <select
          value={alertThreshold}
          onChange={(e) => setAlertThreshold(e.target.value)}
          className={`p-2 rounded ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
          }`}
        >
          <option value="Low">Low (AQI &lt; 50)</option>
          <option value="Moderate">Moderate (AQI 50-100)</option>
          <option value="High">High (AQI &gt; 100)</option>
        </select>
      </div>

      {/* Logout Button */}
      <div
        className={`p-4 rounded-xl text-center ${
          darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
        }`}
      >
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition text-white"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Settings;
