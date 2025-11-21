export default function CpuCard({ cpu }) {
  const perCore = cpu.perCore || [];
  const coreCount = perCore.length;

  const avgLoad =
    coreCount > 0
      ? perCore.reduce((sum, v) => sum + v, 0) / coreCount
      : 0;

  return (
    <div className="card">
      <h2>CPU Load</h2>
      <p className="big">{avgLoad.toFixed(1)}%</p>
      <p>{cpu.model}</p>
      <p>{coreCount} cores</p>
    </div>
  );
}
