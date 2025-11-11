import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { addressPoints } from "./addressPoints.js";
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
    if (!addressPoints || addressPoints.length === 0) return;

    const points = addressPoints.map(p => [p[0], p[1]]);

    const heat = L.heatLayer(points, { 
      radius: 25, 
      blur: 15, 
      maxZoom: 15,
      minOpacity: 0.3,
      max: 1.0,
      gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}
    }).addTo(map);

    if (heat._canvas) {
      heat._canvas.style.opacity = "0.4";
    }

  }, [map]);

  return null;
};

 

const Map = () => {
  const width = useScreenSize();
  const isMobile = width < 640;

  const mapHeight = isMobile
    ? `${window.innerHeight - 140 || 700}px`
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
          <HeatLayer />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
