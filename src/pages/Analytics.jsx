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

        const city = emp.city || emp.CITY;
        const salary = emp.salary || emp.SALARY;

        if (!citySalary[city]) {
          citySalary[city] = 0;
        }

        citySalary[city] += Number(salary);

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
    <div
      style={{
        background: "#f4f6f9",
        minHeight: "100vh",
        padding: 40,
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "auto"
        }}
      >

        <h2 style={{ marginBottom: 30 }}>
          Employee Analytics Dashboard
        </h2>

        {/* Chart Card */}

        <div
          style={{
            background: "white",
            padding: 25,
            borderRadius: 10,
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            marginBottom: 40
          }}
        >

          <h3 style={{ marginBottom: 20 }}>
            Salary Distribution by City
          </h3>

          <svg
            width="100%"
            height="300"
            viewBox="0 0 800 300"
            style={{
              border: "1px solid #eee",
              background: "#fafafa",
              borderRadius: 6
            }}
          >

            {chartData.map((item, index) => {

              const chartWidth = 800;
              const barWidth = 60;

              const gap = chartWidth / chartData.length;

              const x = index * gap + gap / 2 - barWidth / 2;

              const barHeight = item.salary / 1000;

              const y = 250 - barHeight;

              return (
                <g key={index}>

                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill="#4f46e5"
                    rx="6"
                  />

                  <text
                    x={x + barWidth / 2}
                    y={270}
                    textAnchor="middle"
                    fontSize="13"
                  >
                    {item.city}
                  </text>

                </g>
              );

            })}

          </svg>

        </div>

        {/* Map Card */}

        <div
          style={{
            background: "white",
            padding: 25,
            borderRadius: 10,
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
          }}
        >

          <h3 style={{ marginBottom: 20 }}>
            Employee Cities Map
          </h3>

          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{
              height: "450px",
              width: "100%",
              borderRadius: 8
            }}
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
                    <strong>{item.city}</strong>
                    <br />
                    Total Salary: {item.salary}
                  </Popup>
                </Marker>
              );

            })}

          </MapContainer>

        </div>

      </div>
    </div>
  );
}