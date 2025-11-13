import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { addressPoints } from "./addressPoints.js";
import "leaflet.heat";
import L from "leaflet";
import "leaflet-routing-machine";
import { fixedData } from "./pages/cityexpi.jsx";
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

const HeatLayer = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    let heat = null;
    (async () => {
      // enriched: [lat, lon, aqius, barangay, city, psgc]
      const enriched = await getAddressPointsWithAQI();

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

const AQIRouteLayer = ({ startPSGC, endPSGC }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (!startPSGC || !endPSGC) return;

    const points = addressPoints.map((p) => {
      const cityInfo = fixedData.find((c) => c.city === p[3]);
      return {
        id: String(p[4]),
        lat: p[0],
        lon: p[1],
        barangay: p[2],
        city: p[3],
        aqi: cityInfo ? cityInfo.aqius : 100,
      };
    });

    const validIds = points.map((p) => p.id);
    if (!validIds.includes(startPSGC) || !validIds.includes(endPSGC)) {
      console.error("Invalid PSGC code(s) provided.");
      return;
    }

    function haversine(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) ** 2;
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    const graph = new Map();
    points.forEach((p1) => {
      const edges = [];
      points.forEach((p2) => {
        if (p1.id !== p2.id) {
          const dist = haversine(p1.lat, p1.lon, p2.lat, p2.lon);
          if (dist < 0.6) {
            const cost = dist * ((p1.aqi + p2.aqi) / 2);
            edges.push({ to: p2.id, cost });
          }
        }
      });
      graph.set(p1.id, edges);
    });

    function findLeastToxicPath(startId, endId) {
      const costs = {};
      const prev = {};
      const visited = new Set();
      points.forEach((p) => (costs[p.id] = Infinity));
      costs[startId] = 0;

      while (visited.size < points.length) {
        const [current] =
          Object.entries(costs)
            .filter(([id]) => !visited.has(id))
            .sort((a, b) => a[1] - b[1])[0] || [];
        if (!current || current === endId) break;
        visited.add(current);

        for (const edge of graph.get(current) || []) {
          const newCost = costs[current] + edge.cost;
          if (newCost < costs[edge.to]) {
            costs[edge.to] = newCost;
            prev[edge.to] = current;
          }
        }
      }

      const path = [];
      let curr = endId;
      while (curr) {
        const node = points.find((p) => p.id === curr);
        if (!node) break;
        path.unshift([node.lat, node.lon]);
        curr = prev[curr];
      }
      return path;
    }

    const startId = String(1380100135);
    const endId = String(1380300005);
    const route = findLeastToxicPath(startId, endId);

    let routingControl = null;
    if (route.length >= 2) {
      routingControl = L.Routing.control({
        waypoints: route.map(([lat, lon]) => L.latLng(lat, lon)),
        createMarker: () => null,
        routeWhileDragging: false,
        lineOptions: { styles: [{ color: "green", weight: 5 }] },
      }).addTo(map);
    try {
      const bounds = L.latLngBounds(route.map(([lat, lon]) => L.latLng(lat, lon)));
      map.fitBounds(bounds, { padding: [50, 50] });
      } catch (e) {}
    } 

    const createdMarkers = points.map((p) => {
      const color = p.aqi < 70 ? "green" : p.aqi < 85 ? "orange" : "red";
      const m = L.circleMarker([p.lat, p.lon], {
        radius: 8,
        color,
        fillOpacity: 0.8,
      })
        .bindPopup(
          `PSGC: ${p.id}<br>Barangay: ${p.barangay}<br>City: ${p.city}<br>AQI: ${p.aqi}`
        )
        .addTo(map);
      return m;
    });

    return () => {
      if (routingControl && map.removeControl) map.removeControl(routingControl);
      createdMarkers.forEach((m) => map.removeLayer(m));
    };
  }, [map, startPSGC, endPSGC]);

  return null;
};

const Map = ({ startPSGC, endPSGC }) => {
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
          <AQIRouteLayer startPSGC={startPSGC} endPSGC={endPSGC} />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
