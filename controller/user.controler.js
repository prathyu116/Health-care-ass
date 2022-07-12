const User = require("../model/user.model");
const { getPostData } = require("../util");

async function getUsers(req, res) {
  try {
    const users = await User.findAllUser();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (err) {
    console.log(err);
  }
}

async function getUser(req, res, id) {
  try {
    const user = await User.findById(id);
    console.log("user", user);
    if (user.length === 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "user not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    }
  } catch (err) {
    console.log(err);
  }
}
async function createUser(req, res) {
  try {
           const body = await getPostData(req);

           const { first_name, last_name, email, gender,age, password } = JSON.parse(body);

           const user = {
             first_name,
             last_name,
             email,
             gender,
             age,
             password
           };

           const newUser = await User.create(user);

           res.writeHead(201, { "Content-Type": "application/json" });
           return res.end(JSON.stringify(newUser)); 
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
};
