const users = [];

exports.index = (req, res) => {
  res.json({
    status: 'success',
    data: users,
  });
};

exports.create = (req, res) => {
  const requestBody = req.body;

  users.push(new User(requestBody.name, requestBody.email));

  res.status(201).send();
};

class User {
  constructor(name, email) {
    this.id = Math.floor(Math.random() * 100) + Math.random();
    this.name = name;
    this.email = email;
  }
}
