export default function TempCard({ temp }) {
  const tempValue =
    temp !== null && temp !== undefined ? temp.toFixed(1) : "—";

  return (
    <div className="card">
      <h2>Temperature</h2>
      <p className="big">{tempValue} °C</p>
    </div>
  );
}
