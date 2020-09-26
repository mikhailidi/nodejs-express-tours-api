const databaseHelper = require('../../src/helpers/database');

beforeAll(() => {
  return databaseHelper.connect({
    db: global.__DB_URL__,
  });
});

beforeEach(() => {
  return databaseHelper.truncate();
});

afterAll(() => {
  return databaseHelper.disconnect();
});

global.setUpExpressMocks = () => {
  const resJson = jest.fn();
  const resStatus = jest.fn();
  const res = {
    status: resStatus,
    json: resJson,
  };
  resJson.mockImplementation(() => res);
  resStatus.mockImplementation(() => res);

  return res;
};
