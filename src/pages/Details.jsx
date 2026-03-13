import { useParams } from "react-router-dom";

export default function Details() {

  const { id } = useParams();

  return (
    <div style={{ padding: 20 }}>
      <h2>Employee Details</h2>
      <p>Employee ID: {id}</p>
    </div>
  );
}