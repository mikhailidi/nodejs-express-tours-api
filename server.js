const dotenv = require('dotenv');
const app = require('./app');
const port = 3000;

dotenv.config({
  path: './.env',
});

app.listen(port, () => {
  console.log(`Natour app started on port ${port}`);
});
