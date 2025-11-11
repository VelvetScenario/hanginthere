const Alerts = ({ alertData }) => {
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
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-4 px-2 sm:px-4">
      {alertData.map((alert, index) => (
        <div
          key={index}
          className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl shadow-md ${getSeverityColor(alert.severity)} text-white`}
        >
          <div>
            <p className="font-semibold">{alert.message}</p>
            <p className="text-sm text-gray-200">{alert.time}</p>
          </div>
          <div className="px-2 py-1 border border-white rounded mt-2 sm:mt-0">
            {alert.severity}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Alerts;
