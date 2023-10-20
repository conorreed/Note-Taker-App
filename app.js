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
  res.sendFile(path.join(__dirname, 'db', 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'db', 'public', 'index.html'));
});


// API Routes
app.get('/api/notes', (req, res) => {
  const data = JSON.parse(fs.readFileSync('db.json'));
  res.json(data);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4(); 
  const data = JSON.parse(fs.readFileSync('db.json'));
  data.push(newNote);
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const idToDelete = req.params.id;
  const data = JSON.parse(fs.readFileSync('db.json'));
  const updatedData = data.filter((note) => note.id !== idToDelete);
  fs.writeFileSync('db.json', JSON.stringify(updatedData, null, 2));
  res.json({ message: 'Note deleted' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
