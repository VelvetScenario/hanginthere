import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";


const data = [
  { city: "Caloocan", temp: 30, humidity: 70, aqi: 85, wind: 3, pressure: 1012 },
  { city: "Malabon", temp: 31, humidity: 72, aqi: 80, wind: 2.5, pressure: 1010 },
  { city: "Navotas", temp: 29, humidity: 68, aqi: 70, wind: 2, pressure: 1013 },
  { city: "Valenzuela", temp: 32, humidity: 75, aqi: 90, wind: 3.2, pressure: 1011 },
  { city: "Quezon City", temp: 28, humidity: 65, aqi: 78, wind: 2.8, pressure: 1015 },
  { city: "Marikina", temp: 29, humidity: 68, aqi: 76, wind: 2.5, pressure: 1012 },
  { city: "Pasig", temp: 31, humidity: 70, aqi: 82, wind: 3, pressure: 1013 },
  { city: "Taguig", temp: 30, humidity: 69, aqi: 88, wind: 3.1, pressure: 1011 },
  { city: "Makati", temp: 29, humidity: 66, aqi: 80, wind: 2.9, pressure: 1014 },
  { city: "Manila", temp: 32, humidity: 73, aqi: 90, wind: 3.3, pressure: 1010 },
  { city: "Mandaluyong", temp: 30, humidity: 70, aqi: 84, wind: 3, pressure: 1012 },
  { city: "San Juan", temp: 29, humidity: 68, aqi: 79, wind: 2.8, pressure: 1013 },
  { city: "Pasay", temp: 31, humidity: 71, aqi: 87, wind: 3.2, pressure: 1011 },
  { city: "Parañaque", temp: 30, humidity: 69, aqi: 85, wind: 3, pressure: 1012 },
  { city: "Las Piñas", temp: 29, humidity: 67, aqi: 81, wind: 2.7, pressure: 1013 },
  { city: "Muntinlupa", temp: 28, humidity: 65, aqi: 78, wind: 2.5, pressure: 1015 },
  { city: "Malate", temp: 31, humidity: 72, aqi: 89, wind: 3.1, pressure: 1010 },
  { city: "Tondo", temp: 32, humidity: 74, aqi: 92, wind: 3.3, pressure: 1010 }
];

const COLORS = [
  "#0088FE","#00C49F","#FFBB28","#FF8042","#AA336A",
  "#8884d8","#82ca9d","#ffc658","#d0ed57","#a4de6c",
  "#8dd1e1","#83a6ed","#8a2be2","#ff7f50","#ff69b4",
  "#ffa500","#40e0d0","#ff6347"
];

const Dashboard = () => {
  return (
  <div style={{ fontFamily: "Arial, sans-serif", display: "flex", flexDirection: "column", position: 'fixed', inset: 0, height: '100vh', width: '100vw', margin: 0 }}>
      <header style={{ padding: "16px 24px", background: "linear-gradient(90deg,#8e2bff,#417aff)", color: "#ffffff", boxShadow: '0 4px 12px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0, fontSize: '1.25rem' }}>Dashboard</h1>
        <div style={{ display: 'flex', gap: 12 }}>
        </div>
      </header>
      <main style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "28px", width: "100%", padding: "24px", boxSizing: "border-box" }}>
  <div style={{ background: "linear-gradient(90deg, #ffffffff 0%, #ffffffff 100%)", padding: "28px", borderRadius: 12, width: "100%", maxWidth: "900px", margin: "0 auto", boxShadow: "0 8px 24px rgba(16,24,40,0.08)", border: "1px solid rgba(0,0,0,0.06)", borderLeft: "6px solid #8e2bff", transition: "transform 0.15s ease, box-shadow 0.15s ease" }}>
          <h3 style={{ marginTop: 0, color: '#000000ff' }}>Temperature (°C)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis
                dataKey="city"
                stroke="red"
                tick={{ fill: "red", fontSize: 12 }}
                interval={0}       
                angle={-45}            
                textAnchor="end"       
                height={70}            
              />
              <YAxis stroke="red" tick={{ fill: "red" }} fontSize={"12"}/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temp" stroke="#ff0000ff" />
            </LineChart>
          </ResponsiveContainer>
        </div>

  <div style={{ background: "linear-gradient(90deg, #9a0071ff 0%, #a700fbff 100%)", padding: "20px", borderRadius: 12, width: "100%", maxWidth: "900px", margin: "0 auto", boxShadow: "0 8px 24px rgba(16,24,40,0.06)", border: "1px solid rgba(0,0,0,0.06)", borderLeft: "6px solid #ffffffff", transition: "transform 0.15s ease, box-shadow 0.15s ease" }}>
          <h3 style={{ marginTop: 0, color: '#fafafaff' }}>Humidity (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="city" stroke="white" tick={{ fill: "white", fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={70}/>
              <YAxis stroke="white" tick={{ fill: "white", fontSize: "12" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="humidity" fill="#000000ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

  <div style={{ background: "linear-gradient(90deg, #ffffffff 0%, #ffffffff 100%)", padding: "20px", borderRadius: 12, width: "100%", maxWidth: "900px", margin: "0 auto", boxShadow: "0 8px 24px rgba(16,24,40,0.06)", border: "1px solid rgba(0,0,0,0.06)", borderLeft: "6px solid #8e2bff", transition: "transform 0.15s ease, box-shadow 0.15s ease" }}>
          <h3 style={{ marginTop: 0, color: '#000000ff' }}>AQI US</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} dataKey="aqi" nameKey="city" cx="50%" cy="50%" outerRadius={120}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

  <div style={{ background: "linear-gradient(90deg, #001eb3ff 0%, #00a6ffff 100%)", padding: "20px", borderRadius: 12, width: "100%", maxWidth: "900px", margin: "0 auto", boxShadow: "0 8px 24px rgba(16,24,40,0.06)", border: "1px solid rgba(0,0,0,0.06)", borderLeft: "6px solid #ffffffff", transition: "transform 0.15s ease, box-shadow 0.15s ease" }}>
          <h3 style={{ marginTop: 0, color: '#ffffffff' }}>Wind Speed (m/s)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="city" stroke="white" tick={{ fill: "white", fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={70}/>
              <YAxis  stroke="white" tick={{ fill: "white", fontSize: 12 }} />
              <Tooltip/>
              <Legend/>
              <Line type="monotone" dataKey="wind" stroke="#000000ff" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 5: Pressure */}
        <div style={{ background: "#ffffff", padding: "20px", borderRadius: 12, width: "100%", maxWidth: "900px", margin: "0 auto", boxShadow: "0 8px 24px rgba(16,24,40,0.06)", border: "1px solid rgba(0,0,0,0.06)", borderLeft: "6px solid #8e2bff", transition: "transform 0.15s ease, box-shadow 0.15s ease" }}>
          <h3 style={{ marginTop: 0, color: '#000000ff' }}>Pressure (hPa)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="city" stroke="black" tick={{ fill: "black", fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={70}/>
              <YAxis  stroke="black" tick={{ fill: "black", fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="pressure" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>

      <footer style={{ padding: "12px 24px", background: "linear-gradient(90deg,#8e2bff,#417aff)", color: "#ffffff", display: "flex", justifyContent: "space-around", position: "sticky", bottom: 0, boxShadow: '0 -2px 8px rgba(0,0,0,0.2)' }}>
        <button style={{ background: '#000000ff', border: 'none', color: '#fff', padding: '8px 14px', borderRadius: 8, cursor: 'pointer' }}>Dashboard</button>
        <button style={{ background: 'transparent', color: '#ffffffff', padding: '8px 14px', borderRadius: 8, cursor: 'pointer' }}>Map</button>
        <button style={{ background: 'transparent', color: '#ffffffff', padding: '8px 14px', borderRadius: 8, cursor: 'pointer' }}>Alerts</button>
        <button style={{ background: 'transparent', color: '#ffffffff', padding: '8px 14px', borderRadius: 8, cursor: 'pointer' }}>Settings</button>
      </footer>
    </div>
  );
};

export default Dashboard;
