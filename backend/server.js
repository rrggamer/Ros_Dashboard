import express from "express";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/status", (req, res) => {
  const cpu = Math.round(Math.random() * 100);
  const ram = Math.round(Math.random() * 100);
  const temp = 50 + Math.random() * 15;

  res.json({
    cpu,
    ram,
    temp,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
