import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {

    e.preventDefault();

    const success = login(username, password);

    if (success) {
      navigate("/list");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f6f9",
      fontFamily: "Arial, sans-serif"
    }}>

      <div style={{
        background: "white",
        padding: "40px 50px",
        borderRadius: 10,
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        width: 350
      }}>

        <h2 style={{
          textAlign: "center",
          marginBottom: 30
        }}>
          Employee Dashboard
        </h2>

        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: 20 }}>
            <input
              placeholder="Username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 14
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 14
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: 6,
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}