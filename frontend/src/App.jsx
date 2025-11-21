import { useEffect, useState } from "react";
import "./App.css";

import CpuCard from "./components/CpuCard";
import MemoryCard from "./components/MemoryCard";
import TempCard from "./components/TempCard";
import LatencyCard from "./components/LatencyCard";
import StatusGrid from "./components/StatusGrid";
import VideoPanel from "./components/VideoPanel";


const PI_API = "http://localhost:8000";
const CAMERA_URL = "http://localhost:8080/stream?topic=/camera/image_raw";

function App() {
  const [status, setStatus] = useState(null);
  const [latency, setLatency] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      const start = performance.now();

      try {
        const res = await fetch(`${PI_API}/api/status`);
        if (!res.ok) throw new Error("API error");

        const data = await res.json();
        const end = performance.now();
        setLatency(end - start);

        setStatus(data);
        setError("");
      } catch (err) {
        setError("Cannot contact backend");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const id = setInterval(fetchStatus, 1000);
    return () => clearInterval(id);
  }, []);

  if (loading) return <div className="App">Loading...</div>;
  if (error) return <div className="App error">{error}</div>;
  if (!status) return <div className="App">No data</div>;

  return (
    <div className="App">
      <h1>Pi5 System Dashboard</h1>

      <VideoPanel title="Pi5 Camera" streamUrl={CAMERA_URL} />


      <StatusGrid>
        <CpuCard cpu={status.cpu} />
        <MemoryCard mem={status.mem} />
        <TempCard temp={status.temp} />
        <LatencyCard latency={latency} />
      </StatusGrid>

      <p className="timestamp">
        Last update: {new Date(status.timestamp).toLocaleTimeString()}
      </p>
    </div>
  );
}

export default App;
