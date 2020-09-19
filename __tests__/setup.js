const MemoryDatabaseServer = require('./helpers/MemoryDatabaseServer');

module.exports = async () => {
  await MemoryDatabaseServer.start();
};
