const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// API routes за CSV обработка
app.post('/api/upload-csv', (req, res) => {
  // CSV upload логика
});

app.get('/api/process-csv', (req, res) => {
  // CSV processing логика
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});