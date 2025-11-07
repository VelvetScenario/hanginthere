const Alerts = () => {
  // Example alert data
  const alertData = [
    { message: "Air quality is high in Metro Manila", severity: "High", time: "10:30 AM" },
    { message: "Moderate AQI in Caloocan", severity: "Moderate", time: "11:00 AM" },
    { message: "Low AQI in Valenzuela", severity: "Low", time: "11:30 AM" },
  ];

  // Map severity to colors
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Low":
        return "bg-green-500";
      case "Moderate":
        return "bg-yellow-500";
      case "High":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="w-full max-w-5xl flex flex-col gap-4">
      {alertData.map((alert, index) => (
        <div
          key={index}
          className={`flex justify-between items-center p-4 rounded-xl shadow-md ${getSeverityColor(
            alert.severity
          )} text-white`}
        >
          <div>
            <p className="font-semibold">{alert.message}</p>
            <p className="text-sm text-gray-200">{alert.time}</p>
          </div>
          <div className="px-2 py-1 border border-white rounded">{alert.severity}</div>
        </div>
      ))}
    </div>
  );
};

export default Alerts;