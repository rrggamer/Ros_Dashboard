export default function LatencyCard({ latency }) {
  return (
    <div className="card">
      <h2>Latency</h2>
      <p className="big">
        {latency !== null ? latency.toFixed(1) : "—"} ms
      </p>
      <p>HTTP Round Trip</p>
    </div>
  );
}
