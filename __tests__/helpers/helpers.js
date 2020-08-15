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
