import express from "express";
import cors from "cors";
import si from "systeminformation";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// GET /api/status -> htop-like summary
app.get("/api/status", async (req, res) => {
  try {
    const [load, mem, temp, cpu] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.cpuTemperature(),
      si.cpu()
    ]);

    res.json({
      cpu: {
        model: cpu.manufacturer + " " + cpu.brand,
        cores: cpu.cores,
        load: load.current,             // total %
        perCore: load.cpus.map((c) => c.load) // array of %
      },
      mem: {
        total: mem.total,
        used: mem.active,
        usedPercent: (mem.active / mem.total) * 100
      },
      temp: temp.main,                  // °C
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read system info" });
  }
});

app.get("/", (req, res) => {
  res.send("Pi5 htop API running");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Pi5 API on http://0.0.0.0:${PORT}`);
});
