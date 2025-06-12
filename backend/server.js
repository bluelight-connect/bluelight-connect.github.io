const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/DEIN_WEBHOOK_HIER";

app.use(express.static(path.join(__dirname, "../public")));

app.post("/api/bewerbung", async (req, res) => {
  try {
    const payload = req.body;
    const response = await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) return res.status(500).send("Webhook-Fehler");
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Serverfehler");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
