import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const Map = () => {
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
    <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-lg">
      <MapContainer
        center={[14.5995, 120.9842]}
        zoom={11}
        scrollWheelZoom={false}
        className="w-full h-[700px]" // make map taller
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc, idx) => (
          <Marker key={idx} position={[loc.lat, loc.lng]}>
            <Popup>
              <div className="bg-gray-800 p-4 rounded-xl shadow-lg w-64 text-white">
                <h2 className="text-lg font-semibold">{loc.city}</h2>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <p className="text-3xl font-bold">{loc.aqi}</p>
                    <p className="text-sm text-gray-300">{loc.category}</p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold ${getAQIColor(loc.category)}`}
                  >
                    {loc.category}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-400 mb-1">Next 5 hours forecast</p>
                  <div className="flex gap-1">
                    {loc.forecast.map((val, i) => (
                      <div key={i} className="flex-1 bg-gray-700 rounded-lg overflow-hidden">
                        <div
                          className={`h-2 ${val < 60 ? "bg-green-500" : val < 100 ? "bg-yellow-500" : "bg-red-500"}`}
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
