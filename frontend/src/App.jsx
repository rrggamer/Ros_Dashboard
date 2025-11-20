import { useEffect, useState } from "react";
import "./App.css";

const PI_API = "http://localhost:8000"; // or "http://<pi-ip>:8000" later

function App() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`${PI_API}/api/status`);
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
  if (!status) return <div className="App">No data</div>;

  // ---- derive some values from your JSON ----
  const perCore = status.cpu.perCore || [];
  const coreCount = perCore.length;

  const avgLoad =
    coreCount > 0
      ? perCore.reduce((sum, v) => sum + v, 0) / coreCount
      : 0;

  const ramUsedGB = status.mem.used / 1e9;
  const ramTotalGB = status.mem.total / 1e9;

  const tempValue =
    status.temp !== null && status.temp !== undefined
      ? status.temp.toFixed(1)
      : "—";

  return (
    <div className="App">
      <h1>System Status Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h2>CPU Load</h2>
          <p className="big">{avgLoad.toFixed(1)}%</p>
          <p>{status.cpu.model}</p>
          <p>{coreCount} cores</p>
        </div>

        <div className="card">
          <h2>RAM</h2>
          <p className="big">{status.mem.usedPercent.toFixed(1)}%</p>
          <p>
            Used: {ramUsedGB.toFixed(2)} GB / {ramTotalGB.toFixed(2)} GB
          </p>
        </div>

        <div className="card">
          <h2>Temperature</h2>
          <p className="big">{tempValue} °C</p>
        </div>
      </div>

      <p className="timestamp">
        Last update: {new Date(status.timestamp).toLocaleTimeString()}
      </p>
    </div>
  );
}

export default App;
