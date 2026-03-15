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
    <div style={{ padding: 20 }}>

      {/* Header with analytics button */}

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2>Employee List</h2>

        <button
          onClick={() => navigate("/analytics")}
          style={{
            padding: "8px 14px",
            cursor: "pointer"
          }}
        >
          View Analytics
        </button>
      </div>

      <div
        style={{
          height: containerHeight,
          overflowY: "auto",
          border: "1px solid #ccc"
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
                  borderBottom: "1px solid #eee",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 10,
                  cursor: "pointer"
                }}
              >
                {emp.EMPLOYEE_NAME || emp.name || JSON.stringify(emp)}
              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}