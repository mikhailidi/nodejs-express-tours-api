const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({
  path: './.env',
});

const DB = process.env.DB_CONNECTION.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Tour = new mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The best tour ever ' + String(Math.random()),
  rating: 4.6,
  price: 666.66,
});

testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Natour app started on port ${port}`);
});
