import { useState } from "react";

const Settings = () => {
  const [username, setUsername] = useState("Kyle");
  const [email, setEmail] = useState("kyle@example.com");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="w-full max-w-3xl flex flex-col gap-6">
      <h1 className="text-xl font-semibold mb-4">Settings</h1>

      {/* Account Info */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Account</h2>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* App Settings */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Preferences</h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Enable Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="w-5 h-5 accent-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;