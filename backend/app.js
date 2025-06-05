const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 3000;

const mongoUrl = 'mongodb://mongo:27017';
const client = new MongoClient(mongoUrl);

app.get('/api', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('testdb');
    const collection = db.collection('messages');
    const message = await collection.findOne({});
    res.json({ message: message ? message.text : 'No message found' });
  } catch (err) {
    res.status(500).send('Error connecting to DB');
  }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
