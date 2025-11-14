import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

import { addressPoints } from "./addressPoints"; // [lat, lon, barangay, city, PSGC]
import { fixedData } from "./pages/cityexpi"; // [{ city: "Manila", aqius: 85 }, ...]

const AQIRouteMap = ({ startPSGC, endPSGC }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([14.5995, 120.9842], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const points = addressPoints.map((p) => {
      const cityInfo = fixedData.find((c) => c.city === p[3]);
      return {
        id: p[4],
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
      return () => map.remove();
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
        const [current] = Object.entries(costs)
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

    const aqiPath = findLeastToxicPath(startPSGC, endPSGC);

    if (aqiPath.length >= 2) {
      const simplifiedWaypoints = [
        L.latLng(aqiPath[0][0], aqiPath[0][1]),
        ...aqiPath.length > 4
          ? [L.latLng(aqiPath[Math.floor(aqiPath.length / 2)][0], aqiPath[Math.floor(aqiPath.length / 2)][1])]
          : [],
        L.latLng(aqiPath[aqiPath.length - 1][0], aqiPath[aqiPath.length - 1][1]),
      ];

      L.Routing.control({
        waypoints: simplifiedWaypoints,
        routeWhileDragging: false,
        createMarker: () => null,
        lineOptions: { styles: [{ color: "green", weight: 5 }] },
      }).addTo(map);
    }

    points.forEach((p) => {
      const color = p.aqi < 70 ? "green" : p.aqi < 85 ? "orange" : "red";
      L.circleMarker([p.lat, p.lon], {
        radius: 8,
        color,
        fillOpacity: 0.8,
      })
        .bindPopup(
          `PSGC: ${p.id}<br>Barangay: ${p.barangay}<br>City: ${p.city}<br>AQI: ${p.aqi}`
        )
        .addTo(map);
    });

    return () => map.remove();
  }, [startPSGC, endPSGC]);

  return <div ref={mapRef} style={{ height: "100vh", width: "100vw" }} />;
};

export default AQIRouteMap;