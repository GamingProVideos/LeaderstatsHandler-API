const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory store for demo purposes
const playerData = {};

app.post('/get-stats', (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }
  const data = playerData[userId] || { Money: 0, Gems: 0, Rank: 0 };
  res.json(data);
});

app.post('/save-stats', (req, res) => {
  const { userId, Money, Gems, Rank } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }
  playerData[userId] = {
    Money: Money || 0,
    Gems: Gems || 0,
    Rank: Rank || 0,
  };
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});