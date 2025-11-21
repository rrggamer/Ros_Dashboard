export default function MemoryCard({ mem }) {
  const ramUsedGB = mem.used / 1e9;
  const ramTotalGB = mem.total / 1e9;

  return (
    <div className="card">
      <h2>RAM</h2>
      <p className="big">{mem.usedPercent.toFixed(1)}%</p>
      <p>
        Used: {ramUsedGB.toFixed(2)} GB / {ramTotalGB.toFixed(2)} GB
      </p>
    </div>
  );
}
