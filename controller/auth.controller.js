const User = require("../model/user.model");
const { getPostData } = require("../util");

const register = async (req, res) => {
  try {
    const body = await getPostData(req);

    const { first_name, last_name, email, gender, age, password } = JSON.parse(body);
    const user = {
      first_name,
      last_name,
      email,
      gender,
      age,
      password,
    };
    //some validation checking
    if (password.length < 3) {
      res.writeHead(400, { "Content-Type": "application/json" });

      return res.end(JSON.stringify({ message: "Password length atleast 4" }));
    }
    if (password.search(/[a-z]/i) < 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Your password must contain at least one letter" }));
    }

    let userExi = await User.findOne(user);
    if (userExi) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Email already exists" }));
    } else {
      // if new user, create it or allow to register;
      const newUser = await User.create(user);
      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(newUser));
    }
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end();
  }
};
const login = async (req, res) => {
  try {
    const body = await getPostData(req);
    const { email, password } = JSON.parse(body);
    const user = {
      email,
      password,
    };
    let userExi = await User.findOne(user);

    if (!userExi) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Wrong Email or Password" }));
    }
    const verifyedUser = User.checkPassword(user.password, user.email);

    if (!verifyedUser) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Wrong Email or Password" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Loggined succusfully", user: verifyedUser }));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end();
  }
};
module.exports = { register, login };
