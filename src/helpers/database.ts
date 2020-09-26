import mongoose from 'mongoose';

export type IConnect = {
  db: string;
};

const connect = async ({ db }: IConnect) => {
  if (mongoose.connection.readyState === 0) {
    mongoose
      .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => {
        if (process.env.NODE_ENV !== 'test') {
          console.log('🔌 Connected to MongoDB!');
        }
      })
      .catch((err) => {
        if (process.env.NODE_ENV !== 'test') {
          console.log(err);
        }
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

const disconnect = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};

export { connect, truncate, disconnect };
