import { useState, useEffect } from "react";

const Dashboard = ({ aqiData }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const [expandedCard, setExpandedCard] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
      {aqiData.map((city, index) => {
        const aqiColor =
          city.category === "Low"
            ? "bg-green-500"
            : city.category === "Moderate"
            ? "bg-yellow-500"
            : "bg-red-500";

        const recommendation =
          city.category === "Low"
            ? "Air quality is good 🌤"
            : city.category === "Moderate"
            ? "Sensitive groups take caution ⚠️"
            : "Limit outdoor activity 😷";

        const pollutants = city.pollutants || [
          { name: "PM2.5", value: Math.floor(Math.random() * 100) },
          { name: "PM10", value: Math.floor(Math.random() * 100) },
          { name: "CO", value: Math.floor(Math.random() * 10) },
        ];

        const handleCardClick = () => {
          if (isMobile) setExpandedCard(expandedCard === index ? null : index);
        };

        const showExpanded = !isMobile || expandedCard === index;

        return (
          <div
            key={index}
            className="bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-lg transition-transform hover:scale-[1.02] relative cursor-pointer"
            onClick={handleCardClick}
          >
            {/* Top: City Name + AQI */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-base sm:text-lg font-semibold">{city.location}</h2>
                <p className="text-4xl sm:text-5xl font-bold">{city.aqi}</p>
                <p className="text-xs sm:text-sm text-gray-300">{city.category}</p>
              </div>

              {/* AQI Bubble */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-sm font-semibold ${aqiColor}`}
              >
                {city.category}
              </div>
            </div>

            {/* Expanded Info */}
            {showExpanded && (
              <>
                {/* Health Recommendation */}
                <p className="mt-3 text-sm text-gray-200">{recommendation}</p>

                {/* Pollutant Badges */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  {pollutants.map((p, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        p.value < 50 ? "bg-green-500" : p.value < 100 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                    >
                      {p.name}: {p.value}
                    </span>
                  ))}
                </div>

                {/* Forecast Bars */}
                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-2">Next 5 hours forecast</p>
                  <div className="flex gap-2">
                    {city.forecast.map((value, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 bg-gray-700 rounded-lg overflow-hidden h-4 ${
                          value < 60 ? "bg-green-500" : value < 100 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Optional Line Chart */}
                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-1">Trend (last 24h)</p>
                  <div className="w-full h-16 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                    Chart placeholder
                  </div>
                </div>
              </>
            )}

            {isMobile && <div className="absolute bottom-2 right-2 text-gray-400 text-xs">Tap for details</div>}
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
