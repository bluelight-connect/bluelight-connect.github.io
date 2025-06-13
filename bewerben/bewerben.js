const form = document.getElementById("bewerbungForm");
const seite1 = document.getElementById("seite1");
const seite2 = document.getElementById("seite2");
const weiterBtn = document.getElementById("weiter");
const zurueckBtn = document.getElementById("zurueck");

weiterBtn.addEventListener("click", () => {
  if (
    !form.gamename.value.trim() ||
    !form.spiellink.value.trim() ||
    !form.discordlink.value.trim() ||
    !form.ansprecher.value.trim()
  ) {
    alert("Bitte alle Felder auf dieser Seite ausfüllen.");
    return;
  }
  seite1.style.display = "none";
  seite2.style.display = "block";
});

zurueckBtn.addEventListener("click", () => {
  seite2.style.display = "none";
  seite1.style.display = "block";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const payload = {
    content: `📥 **Neue Bewerbung eingegangen!**
**Spielname:** ${form.gamename.value}
**Spiellink:** ${form.spiellink.value}
**Discord:** ${form.discordlink.value}
**Ansprechpartner:** ${form.ansprecher.value}
**Erscheinung:** ${form.zeit.value}
**Eigenschaften:** ${form.eigenschaften.value}
**Region:** ${form.region.value}
**Zielgruppen:** ${form.zielgruppen.value}
**Besonderheiten:** ${form.besonderheit.value}
**Mitgliederanzahl:** ${form.mitgliederanzahl.value}
**Social Media:** ${form.social.value}
**Beschreibung:** ${form.beschreibung.value}`
  };

  fetch("https://dein-backend.onrender.com/api/bewerbung", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(() => {
      alert("Bewerbung erfolgreich abgeschickt!");
      form.reset();
      seite2.style.display = "none";
      seite1.style.display = "block";
    })
    .catch(() => alert("Fehler beim Senden. Bitte später versuchen."));
});
