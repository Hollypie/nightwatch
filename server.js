// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/iss', async (req, res) => {
  const { lat, lon, alt = 20 } = req.query;
  try {
    const apiUrl = `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}&alt=${alt}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
