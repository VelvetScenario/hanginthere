import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const useScreenSize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

const Map = () => {
  const width = useScreenSize();
  const isMobile = width < 640;

  const mapHeight = isMobile
    ? `${window.innerHeight - 140}px`
    : "calc(100vh - 100px)";
  
  const zoomLevel =
    width < 640 ? 10 :
    width < 1024 ? 11 :
    12;

  const locations = [
    { city: "Metro Manila", lat: 14.5995, lng: 120.9842, aqi: 72, category: "High", forecast: [68, 70, 74, 80, 76] },
    { city: "Caloocan", lat: 14.7568, lng: 121.0451, aqi: 60, category: "Moderate", forecast: [55, 58, 62, 65, 61] },
  ];

  const getAQIColor = (category) => {
    switch (category) {
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
    <div className="w-full flex justify-center px-2 sm:px-4 lg:px-8">
      <div className="w-full max-w-[1400px] rounded-2xl overflow-hidden shadow-lg">
        <MapContainer
          center={[14.5995, 120.9842]}
          zoom={zoomLevel}
          scrollWheelZoom={false}
          style={{ width: "100%", height: mapHeight }}
          className="rounded-2xl"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {locations.map((loc, idx) => (
            <Marker key={idx} position={[loc.lat, loc.lng]}>
              <Popup>
                <div className="bg-gray-800 p-4 rounded-xl text-white">
                  <h2 className="text-lg font-semibold">{loc.city}</h2>
                  <p className="text-sm text-gray-300">AQI: {loc.aqi}</p>
                  <p className="text-sm">Category: {loc.category}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
