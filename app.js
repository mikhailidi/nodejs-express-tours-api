const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;

app.get('/', (req, res) => {
  res.status(200).json({ bla: 1 });
});

app.get('/api/v1/tours', (req, res) => {
  const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours.json`)
  );

  res.json({
    status: 'success',
    data: tours,
  });
});

app.listen(port, () => {
  console.log(`Natour app started on port ${port}`);
});
