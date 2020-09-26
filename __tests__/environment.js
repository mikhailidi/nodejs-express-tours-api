const NodeEnvironment = require('jest-environment-node');
const MemoryDatabaseServer = require('./helpers/MemoryDatabaseServer');

class CustomEnvironment extends NodeEnvironment {
  async setup() {
    this.global.__DB_URL__ = await MemoryDatabaseServer.getConnectionString();

    await super.setup();
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = CustomEnvironment;
