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

  const isMobile = windowWidth < 768;
  const [expandedCard, setExpandedCard] = useState(null);

  const [localData, setLocalData] = useState(
    aqiData.map((city) => ({
      ...city,
      pollutants: [
        { name: "PM2.5", value: Math.floor(Math.random() * 100) },
        { name: "PM10", value: Math.floor(Math.random() * 100) },
        { name: "CO", value: Math.floor(Math.random() * 10) },
      ],
      forecast: Array.from({ length: 5 }, () => Math.floor(Math.random() * 150)),
    }))
  );

  const [countdown, setCountdown] = useState(240);
  const totalCountdown = 240;

  // Timer + randomizer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setLocalData((prevData) =>
            prevData.map((city) => ({
              ...city,
              aqi: Math.floor(Math.random() * 200),
              pollutants: [
                { name: "PM2.5", value: Math.floor(Math.random() * 100) },
                { name: "PM10", value: Math.floor(Math.random() * 100) },
                { name: "CO", value: Math.floor(Math.random() * 10) },
              ],
              forecast: Array.from({ length: 5 }, () =>
                Math.floor(Math.random() * 150)
              ),
            }))
          );
          return totalCountdown;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercent = (countdown / totalCountdown) * 100;

  return (
    <>
      <div className="flex items-center mb-4">
        {/* Countdown text */}
        <div className="text-gray-300 text-sm font-medium mr-3">
          Next update: <span className="font-bold">{formatCountdown(countdown)}</span>
        </div>


        <div className="flex-1 bg-gray-700 h-2 rounded overflow-hidden">
          <div
            className="bg-green-500 h-2 transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full 
          max-w-full lg:max-w-[calc(100%-5rem)] 
          px-4 lg:px-0`}
      >
        {localData.map((city, index) => {
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
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold">{city.location}</h2>
                  <p className="text-4xl sm:text-5xl font-bold">{city.aqi}</p>
                  <p className="text-xs sm:text-sm text-gray-300">{city.category}</p>
                </div>

                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-sm font-semibold ${aqiColor}`}
                >
                  {city.category}
                </div>
              </div>

              {showExpanded && (
                <>
                  <p className="mt-3 text-sm text-gray-200">{recommendation}</p>

                  <div className="flex gap-2 mt-3 flex-wrap">
                    {city.pollutants.map((p, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          p.value < 50
                            ? "bg-green-500"
                            : p.value < 100
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {p.name}: {p.value}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4">

                    <div className="flex gap-2">
                      
                    </div>
                  </div>

                  <div className="mt-4">
                  </div>
                </>
              )}

              {isMobile && (
                <div className="absolute bottom-2 right-2 text-gray-400 text-xs">
                  Tap for details
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
