import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/status");
        if (!res.ok) throw new Error("API error");

        const data = await res.json();
        setStatus(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Cannot contact backend");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus(); // first call
    const id = setInterval(fetchStatus, 1000); // every 1s
    return () => clearInterval(id);
  }, []);

  if (loading) return <div className="App">Loading...</div>;
  if (error) return <div className="App error">{error}</div>;

  return (
    <div className="App">
      <h1>System Status Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h2>CPU Usage</h2>
          <p className="big">{status.cpu}%</p>
        </div>

        <div className="card">
          <h2>RAM Usage</h2>
          <p className="big">{status.ram}%</p>
        </div>

        <div className="card">
          <h2>Temperature</h2>
          <p className="big">{status.temp.toFixed(1)} °C</p>
        </div>
      </div>

      <p className="timestamp">
        Last update: {new Date(status.timestamp).toLocaleTimeString()}
      </p>
    </div>
  );
}

export default App;
