const mongoose = require('mongoose');

const connect = async () => {
  const DB_CONNECTION =
    process.env.NODE_ENV === 'test'
      ? global.__DB_URL__
      : process.env.DB_CONNECTION.replace(
          '<PASSWORD>',
          process.env.DB_PASSWORD
        );

  if (mongoose.connection.readyState === 0) {
    mongoose
      .connect(DB_CONNECTION, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Connected to MongoDB!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const truncate = async () => {
  if (mongoose.connection.readyState !== 0) {
    const { collections } = mongoose.connection;

    const promises = Object.keys(collections).map((collection) =>
      mongoose.connection.collection(collection).deleteMany({})
    );

    await Promise.all(promises);
  }
};

module.exports = {
  connect,
  truncate,
};
