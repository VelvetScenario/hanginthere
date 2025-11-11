import React from "react";

const fixedData = [
  {
    city: "Caloocan",
    tp: 30,
    hu: 70,
    pr: 1012,
    ws: 3,
    wd: 180,
    heatIndex: 32,
    aqius: 85,
    mainus: "pm2.5",
    aqicn: 90,
    maincn: "pm10"
  },
  {
    city: "Malabon",
    tp: 31,
    hu: 72,
    pr: 1010,
    ws: 2.5,
    wd: 190,
    heatIndex: 33,
    aqius: 80,
    mainus: "pm2.5",
    aqicn: 88,
    maincn: "pm10"
  },
  {
    city: "Navotas",
    tp: 29,
    hu: 68,
    pr: 1013,
    ws: 2,
    wd: 200,
    heatIndex: 31,
    aqius: 70,
    mainus: "pm2.5",
    aqicn: 75,
    maincn: "pm10"
  }

];

const FixedData = () => {
  return (
    <div>
      <h1>Fixed Weather & AQI Data</h1>
      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>City</th>
            <th>Temp (°C)</th>
            <th>Humidity (%)</th>
            <th>Pressure (hPa)</th>
            <th>Wind Speed (m/s)</th>
            <th>Wind Dir (°)</th>
            <th>Heat Index</th>
            <th>AQI US</th>
            <th>Main Pollutant US</th>
            <th>AQI CN</th>
            <th>Main Pollutant CN</th>
          </tr>
        </thead>
        <tbody>
          {fixedData.map((d, idx) => (
            <tr key={idx}>
              <td>{d.city}</td>
              <td>{d.tp}</td>
              <td>{d.hu}</td>
              <td>{d.pr}</td>
              <td>{d.ws}</td>
              <td>{d.wd}</td>
              <td>{d.heatIndex}</td>
              <td>{d.aqius}</td>
              <td>{d.mainus}</td>
              <td>{d.aqicn}</td>
              <td>{d.maincn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FixedData;
