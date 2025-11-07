const Dashboard = ({ aqiData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
      {aqiData.map((city, index) => (
        <div key={index} className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold">{city.location}</h2>

          <div className="flex justify-between items-center mt-3">
            <div>
              <p className="text-5xl font-bold">{city.aqi}</p>
              <p className="text-sm text-gray-300">{city.category}</p>
            </div>

            {/* AQI Bubble */}
            {city.category === "Low" && (
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white bg-green-500 text-sm font-semibold">
                {city.category}
              </div>
            )}
            {city.category === "Moderate" && (
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white bg-yellow-500 text-sm font-semibold">
                {city.category}
              </div>
            )}
            {city.category === "High" && (
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white bg-red-500 text-sm font-semibold">
                {city.category}
              </div>
            )}
          </div>

          {/* Forecast Bars */}
          <div className="mt-6">
            <p className="text-sm text-gray-400 mb-2">Next 5 hours forecast</p>
            <div className="flex gap-2">
              {city.forecast.map((value, idx) => (
                <div key={idx} className="flex-1 bg-gray-700 rounded-lg overflow-hidden">
                  {value < 60 && <div className="h-4 w-full bg-green-500 rounded-lg"></div>}
                  {value >= 60 && value < 100 && <div className="h-4 w-full bg-yellow-500 rounded-lg"></div>}
                  {value >= 100 && <div className="h-4 w-full bg-red-500 rounded-lg"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
