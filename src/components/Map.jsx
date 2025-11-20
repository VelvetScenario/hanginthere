import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { addressPoints } from "./addressPoints.js";
import "leaflet.heat";
import L from "leaflet";
import "leaflet-routing-machine";
import { fixedData } from "./pages/cityexpi.jsx";
import { CircleMarker, Popup } from "react-leaflet";
import { getAddressPointsWithAQI } from "./addressPoints.js";

const useScreenSize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};

const enriched = await getAddressPointsWithAQI();

const HeatLayer = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    let heat = null;
    (async () => {
      // normalization: map AQI 0 -> 0, 300+ -> 1, clamp in-between
      const MAX_AQI = 300;
      const GAMMA = 1.0;
      const points = enriched.map((p) => {
        const lat = Number(p[0]);
        const lon = Number(p[1]);
        const aqi = Number.isFinite(p[2]) ? Number(p[2]) : 0;
        let intensity = aqi / MAX_AQI;
        intensity = Math.max(0, Math.min(1, intensity)); // clamp 0..1
        if (GAMMA !== 1.0) intensity = Math.pow(intensity, GAMMA);
        return [lat, lon, intensity];
      });

      heat = L.heatLayer(points, {
        radius: 25,
        blur: 15,
        maxZoom: 15,
        minOpacity: 0.3,
        gradient: { 0.0: "blue", 0.5: "lime", 1.0: "red" },
      }).addTo(map);

      if (heat._canvas) heat._canvas.style.opacity = "0.8";
    })();

    return () => {
      if (heat && map.removeLayer) map.removeLayer(heat);
    };
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
          scrollWheelZoom={true}
          minZoom={12}
          maxZoom={18}
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
          {enriched.map(([lat, lng, aqi, brgy, mun], index) => (
            <CircleMarker key={index} center={[lat, lng]} radius={25} stroke={false} fillOpacity={0} color="blue">
              <Popup>
                <p>Barangay: {brgy}</p>
                <p>City: {mun}</p>
                <p>aqius: {aqi}</p>
              </Popup>  
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
