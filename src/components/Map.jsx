import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./addresspoints.js";
import "leaflet.heat";
import L from "leaflet";

const useScreenSize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

const HeatLayer = () => {
  const map = useMap();

  useEffect(() => {
    const points = window.addressPoints.map((p) => { return [p[0], p[1]] });

    L.heatLayer(points, { radius: 25 }).addTo(map);

  }, [map]);
};

const Map = ({ aqiData }) => {
  const width = useScreenSize();
  const isMobile = width < 640;

  const mapHeight = isMobile
    ? `${window.innerHeight - 140}px`
    : "calc(100vh - 100px)";

  const zoomLevel = width < 640 ? 10 : width < 1024 ? 11 : 12;
  
  return (
    <div className="w-full flex justify-center px-2 sm:px-4 lg:px-8">
      <div className="w-full max-w-[1400px] rounded-2xl overflow-hidden shadow-lg">
        <MapContainer
          center={[14.5995, 120.9842]}
          zoom={zoomLevel}
          scrollWheelZoom={false}
          minZoom={8} 
          maxZoom={15}
          maxBounds={[[4.414956, 116.887956], [21.121781, 126.605044]]}
          maxBoundsViscosity={1}
          style={{ width: "100%", height: mapHeight }}
          className="rounded-2xl"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Heatmap */}
          <HeatLayer />

          {aqiData?.map((loc, idx) => (
            <Marker key={idx} position={[loc.lat, loc.lng]}>
              <Popup>
                <div className="bg-gray-800 p-4 rounded-xl text-white">
                  <h2 className="text-lg font-semibold">{loc.location}</h2>
                  <p className="text-sm text-gray-300">AQI: {loc.aqi}</p>
                  <p className="text-sm">Category: {loc.category}</p>
                </div >
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
