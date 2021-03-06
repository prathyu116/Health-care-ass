const User = require("../model/user.model");
const { getPostData } = require("../util");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAllUser();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (err) {
    res.writeHead(500);
    res.end();
  }
};

const getUser = async (req, res, id) => {
  try {
    const user = await User.findById(id);
    if (user.length === 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "user not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    }
  } catch (err) {
    res.writeHead(500);
    res.end();
  }
};

const updateUser = async (req, res, id) => {
  const user = await User.findById(id);
  try {
    console.log(user);
    if (user.length === 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "user not found" }));
    } else {
      const body = await getPostData(req);

      const { first_name, last_name, email, gender, age, password } = JSON.parse(body);
      const userData = {
        first_name: first_name || user[0].first_name,
        last_name: last_name || user[0].last_name,
        email: email || user[0].email,
        gender: gender || user[0].gender,
        age: age || user[0].age,
        password: password || user[0].password,
      };

      const newUpdatedUser = await User.edit(id, userData);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(newUpdatedUser));
    }
  } catch (err) {
    res.writeHead(500);
    res.end();
  }
};
const deleteUser = async (req, res, id) => {
  try {
    const user = await User.findById(id);
    if (user.length === 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "user not found" }));
    } else {
      await User.deleteUser(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Deleted succusfully" }));
    }
  } catch (err) {
    res.writeHead(500);
    res.end();
  }
};
module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
