import { useEffect, useState } from "react";
import { fetchEmployees } from "../services/api";

export default function List() {

  const [employees, setEmployees] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);

  const rowHeight = 50;
  const containerHeight = 600;
  const buffer = 5;

  useEffect(() => {

    async function loadData() {

      const data = await fetchEmployees();

      console.log("API DATA:", data);

      // extract employees safely
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

      <h2>Employee List</h2>

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
                style={{
                  height: rowHeight,
                  borderBottom: "1px solid #eee",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 10
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