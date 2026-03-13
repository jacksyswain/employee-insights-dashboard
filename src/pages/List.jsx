import { useEffect, useState } from "react";
import { fetchEmployees } from "../services/api";

export default function List() {

  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadData() {

      const data = await fetchEmployees();

      console.log("API Data:", data);

      setEmployees(data);

      setLoading(false);
    }

    loadData();

  }, []);

  if (loading) {
    return <h2>Loading employees...</h2>;
  }

  return (
    <div style={{ padding: 20 }}>

      <h2>Employee List</h2>

      {employees.map((emp, index) => (
        <div
          key={index}
          style={{
            padding: 10,
            borderBottom: "1px solid #ccc"
          }}
        >
          {JSON.stringify(emp)}
        </div>
      ))}

    </div>
  );
}