// Trage hier deine Discord Webhook-URL ein
const webhookURL = "DEIN_WEBHOOK_URL_HIER_EINFÜGEN";

document.getElementById("bewerbungForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Formular Seite 1
  const gamename = this.gamename.value.trim();
  const gamelink = this.spiellink.value.trim();
  const discordlink = this.discordlink.value.trim();
  const ansprecher = this.ansprecher.value.trim();

  // Formular Seite 2
  const zeit = this.zeit.value.trim();
  const eigenschaften = this.eigenschaften.value.trim();
  const region = this.region.value.trim();
  const zielgruppen = this.zielgruppen.value.trim();
  const besonderheit = this.besonderheit.value.trim(); // ← "besonderheit" war vorher falsch
  const mitgliederanzahl = this.mitgliederanzahl.value.trim(); // ← "mitliederanzahl" war falsch geschrieben
  const social = this.social.value.trim();
  const beschreibung = this.beschreibung.value.trim();

  // Pflichtfelder prüfen
  if (!gamename || !gamelink || !discordlink || !ansprecher || !zeit || !eigenschaften || !region || !zielgruppen || !besonderheit || !mitgliederanzahl || !social || !beschreibung) {
    alert("Bitte fülle alle Pflichtfelder aus.");
    return;
  }

  // Discord-Nachricht vorbereiten
  const payload = {
    content: `📥 **Neue Bewerbung eingegangen!**
**🎮 Spiel:** ${gamename}
**🔗 Spiellink:** https://www.roblox.com/de/games/${gamelink}
**💬 Discord:** https://discord.gg/${discordlink}
**👤 Ansprechpartner:** ${ansprecher}
**🕒 Erscheinung:** ${zeit}
**✨ Eigenschaften:** ${eigenschaften}
**🌍 Region:** ${region}
**🎯 Zielgruppen:** ${zielgruppen}
**🌟 Besonderheiten:** ${besonderheit}
**👥 Mitgliederanzahl:** ${mitgliederanzahl}
**📱 Social Media:** ${social}
**📝 Beschreibung:** ${beschreibung}`
  };

  // An Discord senden
  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(() => {
    alert("✅ Bewerbung erfolgreich gesendet!");
    this.reset();
  }).catch(() => {
    alert("❌ Fehler beim Senden an Discord.");
  });
});
