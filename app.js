const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static('public'));

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const dbFilePath = path.join(__dirname, 'db', 'db.json');

// API Routes
app.get('/api/notes', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbFilePath));
  res.json(data);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4(); 
  const data = JSON.parse(fs.readFileSync(dbFilePath));
  data.push(newNote);
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const idToDelete = req.params.id;
  const data = JSON.parse(fs.readFileSync(dbFilePath));
  const updatedData = data.filter((note) => note.id !== idToDelete);
  fs.writeFileSync(dbFilePath, JSON.stringify(updatedData, null, 2));
  res.json({ message: 'Note deleted' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
