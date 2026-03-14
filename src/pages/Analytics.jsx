import { useEffect, useState } from "react";
import { fetchEmployees } from "../services/api";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Analytics() {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {

    async function loadData() {

      const data = await fetchEmployees();

      const citySalary = {};

      data.forEach(emp => {

        const city = emp.city;

        if (!citySalary[city]) {
          citySalary[city] = 0;
        }

        citySalary[city] += Number(emp.salary);

      });

      const formatted = Object.entries(citySalary).map(
        ([city, salary]) => ({
          city,
          salary
        })
      );

      setChartData(formatted);
    }

    loadData();

  }, []);

  const cityCoordinates = {
    Delhi: [28.7041, 77.1025],
    Mumbai: [19.0760, 72.8777],
    Bangalore: [12.9716, 77.5946],
    Chennai: [13.0827, 80.2707]
  };

  return (
    <div style={{ padding: 20 }}>

      <h2>Employee Analytics Dashboard</h2>

      {/* SVG Chart */}

      <h3>Salary Distribution by City</h3>

      <svg width="600" height="300" style={{ border: "1px solid #ccc" }}>

        {chartData.map((item, index) => {

          const barHeight = item.salary / 1000;

          const x = index * 100 + 40;

          const y = 250 - barHeight;

          return (
            <g key={index}>

              <rect
                x={x}
                y={y}
                width="50"
                height={barHeight}
                fill="steelblue"
              />

              <text
                x={x}
                y={270}
                fontSize="12"
              >
                {item.city}
              </text>

            </g>
          );
        })}

      </svg>

      {/* Map */}

      <h3 style={{ marginTop: 40 }}>Employee Cities Map</h3>

      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "400px", width: "600px" }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {chartData.map((item, index) => {

          const coords = cityCoordinates[item.city];

          if (!coords) return null;

          return (
            <Marker key={index} position={coords}>
              <Popup>
                {item.city} <br />
                Total Salary: {item.salary}
              </Popup>
            </Marker>
          );
        })}

      </MapContainer>

    </div>
  );
}