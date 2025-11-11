import { useState, useEffect } from "react";

const Settings = ({ darkMode: initialDarkMode = true, onThemeChange, alertThreshold: initialThreshold = "Moderate", onThresholdChange }) => {
  const [darkMode, setDarkMode] = useState(initialDarkMode);
  const [alertThreshold, setAlertThreshold] = useState(initialThreshold);

  // Update theme dynamically
  useEffect(() => {
    if (onThemeChange) onThemeChange(darkMode ? "dark" : "light");
  }, [darkMode, onThemeChange]);

  // Update Alert dynamically
  useEffect(() => {
    if (onThresholdChange) onThresholdChange(alertThreshold);
  }, [alertThreshold, onThresholdChange]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 flex flex-col gap-6">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>

      {/* Theme Toggle */}
      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
        <span>Dark Mode</span>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="w-5 h-5 accent-green-500"
        />
      </div>

      {/* Alert Threshold */}
      <div className="flex flex-col p-4 bg-gray-800 rounded-xl">
        <label className="mb-2">Alert Threshold</label>
        <select
          value={alertThreshold}
          onChange={(e) => setAlertThreshold(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        >
          <option value="Low">Low (AQI &lt; 50)</option>
          <option value="Moderate">Moderate (AQI 50-100)</option>
          <option value="High">High (AQI &gt; 100)</option>
        </select>
      </div>

      {/* About */}
      <div className="p-4 bg-gray-800 rounded-xl text-gray-300 text-sm">
        <p>Air Quality Dashboard v1.0</p>
        <p>Developed by You</p>
      </div>
    </div>
  );
};

export default Settings;
