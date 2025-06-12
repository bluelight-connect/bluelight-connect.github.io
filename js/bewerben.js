const form = document.getElementById("bewerbungForm");
const seite1 = document.getElementById("seite1");
const seite2 = document.getElementById("seite2");
const weiterBtn = document.getElementById("weiter");
const zurueckBtn = document.getElementById("zurueck");

weiterBtn.addEventListener("click", () => {
  const { gamename, spiellink, discordlink, ansprecher } = form;

  if (
    !gamename.value.trim() ||
    !spiellink.value.trim() ||
    !discordlink.value.trim() ||
    !ansprecher.value.trim()
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

  const getValue = (name) => form[name].value.trim();

  const payload = {
    content: `📥 **Neue Bewerbung eingegangen!**
**Spielname:** ${getValue("gamename")}
**Spiellink:** ${getValue("spiellink")}
**Discord:** ${getValue("discordlink")}
**Ansprechpartner:** ${getValue("ansprecher")}
**Erscheinung:** ${getValue("zeit")}
**Eigenschaften:** ${getValue("eigenschaften")}
**Region:** ${getValue("region")}
**Zielgruppen:** ${getValue("zielgruppen")}
**Besonderheiten:** ${getValue("besonderheit")}
**Mitgliederanzahl:** ${getValue("mitgliederanzahl")}
**Social Media:** ${getValue("social")}
**Beschreibung:** ${getValue("beschreibung")}`
  };

  fetch("/api/bewerbung", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      if (!res.ok) throw new Error("Fehler beim Senden");
      alert("✅ Bewerbung erfolgreich übermittelt!");
      form.reset();
      seite1.style.display = "block";
      seite2.style.display = "none";
    })
    .catch((err) => {
      console.error(err);
      alert("❌ Fehler beim Absenden. Bitte später erneut versuchen.");
    });
});
