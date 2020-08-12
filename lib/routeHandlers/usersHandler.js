const { Router } = require('express');

const router = Router();

const users = [];
getAllUsers = (req, res) => {
  res.json({
    status: 'success',
    data: users,
  });
};

createUser = (req, res) => {
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

router.route('/').get(getAllUsers).post(createUser);

module.exports = router;
