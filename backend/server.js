import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

// === CONFIG ===
const CLIENT_ID = '1383041041749512253';
const CLIENT_SECRET = '3831932';
const REDIRECT_URI = 'https://bluelight-connect-backend.onrender.com/callback';

// === ROUTES ===
app.get('/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.send('Kein Code erhalten');

  try {
    // Token von Discord holen
    const tokenRes = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        scope: 'identify guilds email guilds.join',
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const access_token = tokenRes.data.access_token;

    // Benutzerinfo holen
    const userRes = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    res.send(`
      <h1>Willkommen, ${userRes.data.username}#${userRes.data.discriminator}!</h1>
      <p>Deine Discord-ID: ${userRes.data.id}</p>
    `);
  } catch (err) {
    console.error(err);
    res.send('Ein Fehler ist aufgetreten.');
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Bluelight Backend läuft!</h1>');
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

