// Trage hier deine Discord Webhook-URL ein
const webhookURL = "DEIN_WEBHOOK_URL_HIER_EINFÜGEN";

document.getElementById("bewerbungForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Formulardaten einsammeln
  const name = this.name.value.trim();
  const motivation = this.motivation.value.trim();
  const erfahrung = this.erfahrung.value.trim();
  const spielname = this.spielname.value.trim();
  const spiellinkCode = this.spiellink.value.trim();
  const discordCode = this.discordlink.value.trim();
  const verantwortlich = this.verantwortlich.value.trim();

  // Pflichtfelder prüfen
  if (!name || !motivation || !spielname || !spiellinkCode || !discordCode || !verantwortlich) {
    alert("Bitte fülle alle Pflichtfelder aus.");
    return;
  }

  // Roblox- und Discord-Link zusammensetzen
  const robloxURL = `https://www.roblox.com/de/games/${spiellinkCode}`;
  const discordURL = `https://discord.gg/${discordCode}`;

  // Discord-Nachricht vorbereiten
  const payload = {
    content: `📥 **Neue Bewerbung eingegangen!**
**👤 Name:** ${name}
**📝 Motivation:** ${motivation}
**🔧 Erfahrung:** ${erfahrung || "Keine Angabe"}
**🎮 Roblox-Spiel:** ${spielname}
**🔗 Roblox-Link:** ${robloxURL}
**💬 Discord:** ${discordURL}
**👑 Verantwortlich:** ${verantwortlich}`
  };

  // An Discord senden
  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(() => {
    alert("✅ Bewerbung erfolgreich gesendet!");
    this.reset();
  })
  .catch(() => {
    alert("❌ Fehler beim Senden. Bitte versuche es später erneut.");
  });
});
