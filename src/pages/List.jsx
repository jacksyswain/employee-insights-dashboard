import { useEffect, useState } from "react";
import { fetchEmployees } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function List() {

  const [employees, setEmployees] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);

  const navigate = useNavigate();

  const rowHeight = 50;
  const containerHeight = 600;
  const buffer = 5;

  useEffect(() => {

    async function loadData() {

      const data = await fetchEmployees();

      console.log("API DATA:", data);

      let employeeArray = [];

      if (Array.isArray(data)) {
        employeeArray = data;
      }
      else if (Array.isArray(data?.data)) {
        employeeArray = data.data;
      }
      else if (Array.isArray(data?.TABLE_DATA)) {
        employeeArray = data.TABLE_DATA;
      }
      else if (Array.isArray(data?.TABLE_DATA?.data)) {
        employeeArray = data.TABLE_DATA.data;
      }

      setEmployees(employeeArray);

    }

    loadData();

  }, []);

  const totalRows = employees.length;

  const visibleCount = Math.ceil(containerHeight / rowHeight);

  const startIndex = Math.floor(scrollTop / rowHeight);

  const endIndex = startIndex + visibleCount + buffer;

  const visibleRows = employees.slice(startIndex, endIndex);

  const offsetY = startIndex * rowHeight;

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <div style={{
      padding: 30,
      fontFamily: "Arial, sans-serif",
      background: "#f4f6f9",
      minHeight: "100vh"
    }}>

      {/* Header */}

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
      }}>
        <h2 style={{ margin: 0 }}>Employee Dashboard</h2>

        <button
          onClick={() => navigate("/analytics")}
          style={{
            padding: "10px 16px",
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          View Analytics
        </button>
      </div>

      {/* Card Container */}

      <div style={{
        background: "white",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden"
      }}>

        {/* Table Header */}

        <div style={{
          display: "flex",
          padding: "12px 16px",
          background: "#eef2ff",
          fontWeight: "bold",
          borderBottom: "1px solid #ddd"
        }}>
          <div style={{ width: "100%" }}>Employee Name</div>
        </div>

        {/* Scroll Container */}

        <div
          style={{
            height: containerHeight,
            overflowY: "auto"
          }}
          onScroll={handleScroll}
        >

          <div
            style={{
              height: totalRows * rowHeight,
              position: "relative"
            }}
          >

            <div
              style={{
                transform: `translateY(${offsetY}px)`
              }}
            >

              {visibleRows.map((emp, index) => (

                <div
                  key={startIndex + index}
                  onClick={() => navigate(`/details/${startIndex + index}`)}
                  style={{
                    height: rowHeight,
                    display: "flex",
                    alignItems: "center",
                    padding: "0 16px",
                    borderBottom: "1px solid #eee",
                    cursor: "pointer",
                    background: index % 2 === 0 ? "#fff" : "#fafafa",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f1f5f9"}
                  onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? "#fff" : "#fafafa"}
                >
                  {emp.EMPLOYEE_NAME || emp.name || JSON.stringify(emp)}
                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}