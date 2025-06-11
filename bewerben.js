const webhookURL = "https://discord.com/api/webhooks/1381811213494915112/xWBlig7TN9vZzwNlBJzLFW23caCLACJp9ZYdBGZP7CV1syxjdh8pd_C-XEYN25pb-WT6";

const form = document.getElementById("bewerbungForm");
const seite1 = document.getElementById("seite1");
const seite2 = document.getElementById("seite2");
const weiterBtn = document.getElementById("weiterBtn");
const zurueckBtn = document.getElementById("zurueckBtn");

weiterBtn.addEventListener("click", () => {
  // Prüfen ob alle Felder von Seite 1 ausgefüllt sind
  const fields = seite1.querySelectorAll("input");
  for (let field of fields) {
    if (!field.value.trim()) {
      alert("Bitte fülle alle Felder aus.");
      return;
    }
  }
  seite1.classList.add("hidden");
  seite2.classList.remove("hidden");
});

zurueckBtn.addEventListener("click", () => {
  seite2.classList.add("hidden");
  seite1.classList.remove("hidden");
});

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const data = new FormData(form);
  const content = `📥 **Neue Bewerbung eingegangen!**
Spielname: ${data.get("gamename")}
Spiellink: ${data.get("spiellink")}
Discord: ${data.get("discordlink")}
Ansprechpartner: ${data.get("ansprecher")}
Erscheinung: ${data.get("zeit")}
Eigenschaften: ${data.get("eigenschaften")}
Region: ${data.get("region")}
Zielgruppen: ${data.get("zielgruppen")}
Besonderheiten: ${data.get("besonderheit")}
Mitgliederanzahl: ${data.get("mitgliederanzahl")}
Social Media: ${data.get("social")}
Beschreibung: ${data.get("beschreibung")}`;

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content })
  }).then(() => {
    alert("✅ Bewerbung erfolgreich gesendet!");
    form.reset();
    seite2.classList.add("hidden");
    seite1.classList.remove("hidden");
  }).catch(() => {
    alert("❌ Fehler beim Senden an Discord.");
  });
});
