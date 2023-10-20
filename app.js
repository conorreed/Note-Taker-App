const express = require('express');
const app = express();
const path = require('path');

// Define routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// ... Other route definitions

// Start the server
// const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const fs = require('fs');

// Define a route to read and return all saved notes
app.get('/api/notes', (req, res) => {
  const data = JSON.parse(fs.readFileSync('db.json'));
  res.json(data);
});

// Define a route to receive and save new notes
app.post('/api/notes', (req, res) => {
  const newNote = req.body; // Assuming you are using body-parser middleware
  newNote.id = generateUniqueID(); // Implement this function to generate a unique ID
  const data = JSON.parse(fs.readFileSync('db.json'));
  data.push(newNote);
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
  res.json(newNote);
});

// ... Other route definitions

// Ensure you have body-parser or another middleware to handle JSON data in your requests

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
